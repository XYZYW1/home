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
                    // Update existing event
                    calendar.getEventById(currentEvent.id).setExtendedProp('note', note);
                } else {
                    // Add new event
                    calendar.addEvent({
                        id: Date.now().toString(),
                        start: currentEvent.date,
                        end: currentEvent.date,
                        extendedProps: {
                            note: note
                        }
                    });
                }
                saveEvents();
                modal.style.display = 'none';
            }
        });

        // Save events to local storage
        function saveEvents() {
            const events = calendar.getEvents().map(event => ({
                id: event.id,
                start: event.startStr,
                end: event.endStr,
                note: event.extendedProps.note
            }));
            localStorage.setItem('calendarEvents', JSON.stringify(events));
        }

        // Load events from local storage
        function loadEvents() {
            const events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
            return events.map(event => ({
                id: event.id,
                start: event.start,
                end: event.end,
                extendedProps: {
                    note: event.note
                }
            }));
        }
    }

    // Daily Verse Functionality
    if (document.getElementById('daily-verse')) {
        // Replace with your API or static verse
        const dailyVerseElement = document.getElementById('daily-verse');
        
        // Example static verse (replace with dynamic content if needed)
        const dailyVerse = "This is a placeholder for the daily verse.";
        dailyVerseElement.innerText = dailyVerse;

        // If you have an API to fetch the daily verse, use the following code instead:
        /*
        fetch('https://api.example.com/daily-verse')
            .then(response => response.json())
            .then(data => {
                dailyVerseElement.innerText = data.verse;
            })
            .catch(error => {
                console.error('Error fetching daily verse:', error);
                dailyVerseElement.innerText = "Could not load the daily verse.";
            });
        */
    }

    // Gallery Functionality
    if (document.getElementById('gallery')) {
        const galleryEl = document.getElementById('gallery');
        const images = [
            'image1.jpg',
            'image2.jpg',
            'image3.jpg'
            // Add more image paths here
        ];

        images.forEach(src => {
            const img = document.createElement('img');
            img.src = `images/${src}`; // Adjust path as needed
            img.alt = 'Gallery Image';
            img.classList.add('grid-item');
            galleryEl.appendChild(img);
        });
    }
});

