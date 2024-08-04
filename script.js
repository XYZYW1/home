// Initialize Calendar Grid
function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    // Generate grid days
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        dayEl.dataset.date = `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
        dayEl.addEventListener('click', showModal);
        calendarEl.appendChild(dayEl);
    }
}

// Show Modal
function showModal(event) {
    const selectedDate = event.target.dataset.date;
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('save-note').dataset.date = selectedDate;
}

// Close Modal
document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Save Note
document.getElementById('save-note').addEventListener('click', function() {
    const date = this.dataset.date;
    const note = document.getElementById('note').value;
    localStorage.setItem(date, note); // Save note to localStorage

    document.getElementById('modal').style.display = 'none';

    // Optionally update the calendar view here
});

// Load Notes on Page Load
function loadNotes() {
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        const date = day.dataset.date;
        const note = localStorage.getItem(date);
        if (note) {
            day.title = note; // Display note as tooltip or use any other method
        }
    });
}

// Initialization on page load
document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
    loadNotes();
});
