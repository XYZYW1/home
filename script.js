document.addEventListener('DOMContentLoaded', () => {
    // Handle Date to Remember Page
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
            events: JSON.parse(localStorage.getItem('events')) || [],
            dateClick: function(info) {
                currentEvent = null;
                eventTitleInput.value = '';
                eventNoteInput.value = '';
                eventImageInput.value = '';
                modal.style.display = 'flex';
            },
            eventClick: function(info) {
                currentEvent = info.event;
                eventTitleInput.value = currentEvent.title;
                eventNoteInput.value = currentEvent.extendedProps.note || '';
                eventImageInput.value = '';
                modal.style.display = 'flex';
            },
            eventAdd: function(event) {
                saveEvents();
            },
            eventChange: function(event) {
                saveEvents();
            },
            eventRemove: function(event) {
                saveEvents();
            }
        });

        calendar.render();

        // Save event function
        function saveEvents() {
            const events = calendar.getEvents().map(event => ({
                title: event.title,
                start: event.start.toISOString(),
                end: event.end ? event.end.toISOString() : null,
                note: event.extendedProps.note || '',
                image: event.extendedProps.image || ''
            }));
            localStorage.setItem('events', JSON.stringify(events));
            updateDateList();
        }

        // Update date list
        function updateDateList() {
            dateList.innerHTML = '';
            calendar.getEvents().forEach(event => {
                const li = document.createElement('li');
                li.textContent = event.start.toLocaleDateString();
                dateList.appendChild(li);
            });
        }

        // Save event button click
        saveEventBtn.addEventListener('click', () => {
            const title = eventTitleInput.value;
            const note = eventNoteInput.value;
            const imageFile = eventImageInput.files[0];

            if (currentEvent) {
                currentEvent.setProp('title', title);
                currentEvent.setExtendedProp('note', note);
                if (imageFile) {
                    const reader = new FileReader();
                    reader.onload = function() {
                        currentEvent.setExtendedProp('image', reader.result);
                        saveEvents();
                    };
                    reader.readAsDataURL(imageFile);
                } else {
                    currentEvent.setExtendedProp('image', '');
                    saveEvents();
                }
            } else {
                const image = imageFile ? URL.createObjectURL(imageFile) : '';
                calendar.addEvent({
                    title,
                    start: new Date(),
                    end: new Date(),
                    extendedProps: { note, image }
                });
                saveEvents();
            }
            modal.style.display = 'none';
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Handle Daily Verse Page
    if (document.querySelector('.daily-verse')) {
        // Example daily verse functionality
        // You can replace this with your own logic to fetch and display a daily verse
        const dailyVerse = document.querySelector('.daily-verse blockquote');
        dailyVerse.textContent = "For God so loved the world, that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life. - John 3:16";
    }

    // Handle Gallery Page
    if (document.querySelector('.image-grid')) {
        // Example gallery functionality
        // Add more logic here if you need to load images dynamically
        console.log("Gallery page loaded");
    }

    // Handle Home Page
    if (document.querySelector('.hero')) {
        // Example home page functionality
        // Add more logic here if you need to customize the home page
        console.log("Home page loaded");
    }
});
