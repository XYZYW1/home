document.addEventListener('DOMContentLoaded', () => {
    // Calendar Functionality
    if (document.getElementById('calendar')) {
        const calendarEl = document.getElementById('calendar');
        const modal = document.getElementById('modal');
        const closeBtn = document.getElementById('close-btn');
        const saveNoteBtn = document.getElementById('save-note');
        const noteInput = document.getElementById('note');
        let currentEvent;

        // Initialize FullCalendar
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            editable: true,
            selectable: true,
            events: loadEvents(),
            dateClick: function(info) {
                currentEvent = {
                    date: info.dateStr
                };
                showModal();
            },
            eventClick: function(info) {
                currentEvent = {
                    id: info.event.id,
                    date: info.event.startStr,
                    note: info.event.extendedProps.note
                };
                noteInput.value = currentEvent.note || '';
                showModal();
            }
        });

        calendar.render();

        // Show modal
        function showModal() {
            modal.style.display = 'flex';
        }

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Save note
        saveNoteBtn.addEventListener('click', () => {
            if (currentEvent) {
                const note = noteInput.value;

                if (currentEvent.id) {
                    calendar.getEventById(currentEvent.id).setExtendedProp('note', note);
                } else {
                    const event = {
                        date: currentEvent.date,
                        note: note
                    };
                    saveEventToServer(event).then(() => {
                        calendar.addEvent({
                            id: Date.now().toString(),
                            start: currentEvent.date,
                            end: currentEvent.date,
                            extendedProps: {
                                note: note
                            }
                        });
                    });
                }
                modal.style.display = 'none';
            }
        });

        // Save events to the server
        function saveEventToServer(event) {
            return fetch('http://localhost:5000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });
        }

        // Load events from the server
        function loadEvents() {
            return fetch('http://localhost:5000/events')
                .then(response => response.json())
                .then(events => {
                    return events.map(event => ({
                        id: event._id,
                        start: event.date,
                        end: event.date,
                        extendedProps: {
                            note: event.note
                        }
                    }));
                });
        }
    }

    // Daily Verse Functionality
    if (document.getElementById('daily-verse')) {
        fetchDailyVerse().then(verse => {
            document.getElementById('daily-verse').innerText = verse;
        });
    }

    // Fetch the daily verse from a backend or external API
    function fetchDailyVerse() {
        return fetch('http://localhost:5000/daily-verse') // Replace with your backend API URL
            .then(response => response.json())
            .then(data => data.verse || "No verse available today");
    }

    // Gallery Functionality
    if (document.getElementById('gallery')) {
        const galleryEl = document.getElementById('gallery');
        loadGalleryImages().then(images => {
            images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Gallery Image';
                img.classList.add('grid-item');
                galleryEl.appendChild(img);
            });
        });
    }

    // Load gallery images from the backend
    function loadGalleryImages() {
        return fetch('http://localhost:5000/gallery-images') // Replace with your backend API URL
            .then(response => response.json())
            .then(data => data.images || []);
    }
});
