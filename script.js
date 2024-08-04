document.addEventListener('DOMContentLoaded', () => {
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
});
