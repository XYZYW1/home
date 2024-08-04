document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close-btn');
    const saveBtn = document.getElementById('save-note');
    const noteTextarea = document.getElementById('note');
    const fileInput = document.getElementById('file');
    const noteList = document.getElementById('note-list');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dateClick: function(info) {
            showModal(info.dateStr);
        },
        events: function(fetchInfo, successCallback, failureCallback) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            successCallback(notes.map(note => ({
                title: note.text,
                start: note.date,
                extendedProps: {
                    file: note.file
                }
            })));
        }
    });

    calendar.render();

    function showModal(dateStr) {
        modal.style.display = 'flex';
        saveBtn.dataset.date = dateStr;
    }

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    saveBtn.addEventListener('click', function() {
        const dateStr = saveBtn.dataset.date;
        const noteText = noteTextarea.value;
        const file = fileInput.files[0];

        if (noteText.trim() !== '' || file) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push({
                date: dateStr,
                text: noteText,
                file: file ? URL.createObjectURL(file) : null
            });
            localStorage.setItem('notes', JSON.stringify(notes));
            calendar.refetchEvents();
            noteTextarea.value = '';
            fileInput.value = '';
            modal.style.display = 'none';
            updateNoteList();
        }
    });

    function updateNoteList() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        noteList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = `${note.date}: ${note.text}`;
            if (note.file) {
                const img = document.createElement('img');
                img.src = note.file;
                img.style.maxWidth = '100px';
                img.style.marginLeft = '10px';
                li.appendChild(img);
            }
            noteList.appendChild(li);
        });
    }

    updateNoteList();
});
