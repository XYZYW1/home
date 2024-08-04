document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('daily-verse-page')) {
        fetchDailyVerse();
    }
});

function fetchDailyVerse() {
    // Example API endpoint that provides random Quran verses
    const apiUrl = 'https://api.aladhan.com/v1/verses/random'; // Adjust URL if needed

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); // Log API response to check the structure
            const verseContent = document.getElementById('verse-content');
            // Adjust based on API response structure
            if (data && data.data) {
                const verse = data.data.verse; // Example structure
                const reference = data.data.reference; // Example structure
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
