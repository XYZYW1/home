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
document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('daily-verse-page')) {
        fetchDailyVerse();
    }
});

function fetchDailyVerse() {
    // Total number of Surahs in the Quran
    const totalSurahs = 114;

    // Get a random Surah number between 1 and 114
    const randomSurah = Math.floor(Math.random() * totalSurahs) + 1;

    // Get a random Ayah number based on the Surah number
    fetch(`https://myislam.org/api/quran/verses/ayah?surah=${randomSurah}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Randomly select an Ayah from the list of verses
            const ayahs = data.ayahs;
            if (ayahs.length > 0) {
                const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
                const verseContent = document.getElementById('verse-content');
                const verse = randomAyah.text; // Example structure
                const reference = `Surah ${randomAyah.surah} - Ayah ${randomAyah.ayah}`; // Example structure
                verseContent.innerHTML = `<p>${verse}</p><footer>${reference}</footer>`;
            } else {
                document.getElementById('verse-content').innerHTML = 'Unable to fetch verse. Please try again later.';
            }
        })
        .catch(error => {
            console.error('Error fetching verse:', error);
            document.getElementById('verse-content').innerHTML = 'Unable to fetch verse. Please try again later.';
        });
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
document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('date-to-remember-page')) {
        initializeCalendar();
    } else if (document.body.classList.contains('daily-verse-page')) {
        fetchDailyVerse();
    }
});

function initializeCalendar() {
    // Existing code for initializing and managing the calendar
}

function fetchDailyVerse() {
    // Replace with a real API endpoint
    const apiUrl = 'https://api.quran.com/v4/verses/random';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const verseContent = document.getElementById('verse-content');
            if (data && data.data) {
                const verse = data.data.text; // Adjust based on API response structure
                const reference = data.data.reference; // Adjust based on API response structure
                verseContent.innerHTML = `<p>${verse}</p><footer>${reference}</footer>`;
            } else {
                verseContent.innerHTML = 'Unable to fetch verse. Please try again later.';
            }
        })
        .catch(error => {
            console.error('Error fetching verse:', error);
            document.getElementById('verse-content').innerHTML = 'Unable to fetch verse. Please try again later.';
        });
}

// Additional functions for other pages
