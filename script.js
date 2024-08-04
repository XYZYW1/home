document.addEventListener('DOMContentLoaded', () => {
    // Initialize FullCalendar if calendar element is present
    if (document.getElementById('calendar')) {
        const calendarEl = document.getElementById('calendar');
        const modal = document.getElementById('modal');
        const closeBtn = document.getElementById('close-btn');
        const saveEventBtn = document.getElementById('save-event');
        const eventTitleInput = document.getElementById('event-title');
        const eventNoteInput = document.getElementById('event-note');
        let currentEvent;

        // Initialize FullCalendar
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            editable: true,
            selectable: true,
            events: JSON.parse(localStorage.getItem('events')) || [],
            dateClick: function(info) {
                currentEvent = null;
                eventTitleInput.value = '';
                eventNoteInput.value = '';
                modal.style.display = 'flex';
                document.getElementById('event-title').focus();
            },
            eventClick: function(info) {
                currentEvent = info.event;
                eventTitleInput.value = currentEvent.title;
                eventNoteInput.value = currentEvent.extendedProps.note || '';
                modal.style.display = 'flex';
            }
        });

        calendar.render();

        // Save event function
        function saveEvents() {
            const events = calendar.getEvents().map(event => ({
                title: event.title,
                start: event.start.toISOString(),
                end: event.end ? event.end.toISOString() : null,
                note: event.extendedProps.note || ''
            }));
            localStorage.setItem('events', JSON.stringify(events));
        }

        // Save event button click
        saveEventBtn.addEventListener('click', () => {
            const title = eventTitleInput.value;
            const note = eventNoteInput.value;

            if (currentEvent) {
                currentEvent.setProp('title', title);
                currentEvent.setExtendedProp('note', note);
            } else {
                calendar.addEvent({
                    title,
                    start: new Date(),
                    end: new Date(),
                    extendedProps: { note }
                });
            }
            saveEvents();
            modal.style.display = 'none';
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Daily Verse Page
    if (document.querySelector('.daily-verse')) {
        const dailyVerse = document.querySelector('.daily-verse blockquote');
        dailyVerse.textContent = "For God so loved the world, that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life. - John 3:16";
    }

    // Gallery Page
    if (document.querySelector('.image-grid')) {
        console.log("Gallery page loaded");
    }

    // Home Page
    if (document.querySelector('.hero')) {
        console.log("Home page loaded");
    }
});
