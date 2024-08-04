document.addEventListener('DOMContentLoaded', () => {
    // Calendar Functionality
    if (document.getElementById('calendar')) {
        const calendarEl = document.getElementById('calendar');
        const modal = document.getElementById('modal');
        const closeBtn = document.getElementById('close-btn');
        const saveEventBtn = document.getElementById('save-event');
        const eventTitleInput = document.getElementById('event-title');
        const eventNoteInput = document.getElementById('event-note');
        const eventImageInput = document.getElementById('event-image');
        const dateList = document.getElementById('date-list');
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
                    title: info.event.title,
                    note: info.event.extendedProps.note,
                    image: info.event.extendedProps.image
                };
                eventTitleInput.value = currentEvent.title || '';
                eventNoteInput.value = currentEvent.note || '';
                if (currentEvent.image) {
                    eventImageInput.dataset.url = currentEvent.image;
                }
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

        // Save event
        saveEventBtn.addEventListener('click', () => {
            if (currentEvent) {
                const title = eventTitleInput.value;
                const note = eventNoteInput.value;
                const image = eventImageInput.files[0] ? URL.createObjectURL(eventImageInput.files[0]) : eventImageInput.dataset.url;

                if (currentEvent.id) {
                    // Update existing event
                    const event = calendar.getEventById(currentEvent.id);
                    event.setProp('title', title);
                    event.setExtendedProp('note', note);
                    event.setExtendedProp('image', image);
                } else {
                    // Add new event
                    calendar.addEvent({
                        id: Date.now().toString(),
                        title: title,
                        start: currentEvent.date,
                        end: currentEvent.date,
                        extendedProps: {
                            note: note,
                            image: image
                        }
                    });
                }
                saveEvents();
                updateDateList();
                modal.style.display = 'none';
            }
        });

        // Save events to local storage
        function saveEvents() {
            const events = calendar.getEvents().map(event => ({
                id: event.id,
                title: event.title,
                start: event.startStr,
                end: event.endStr,
                note: event.extendedProps.note,
                image: event.extendedProps.image
            }));
            localStorage.setItem('calendarEvents', JSON.stringify(events));
        }

        // Load events from local storage
        function loadEvents() {
            const events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
            return events.map(event => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                extendedProps: {
                    note: event.note,
                    image: event.image
                }
            }));
        }

        // Update the list of dates
        function updateDateList() {
            dateList.innerHTML = '';
            calendar.getEvents().forEach(event => {
                const li = document.createElement('li');
                li.innerText = event.startStr;
                dateList.appendChild(li);
            });
        }

        updateDateList();
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
            'image1
