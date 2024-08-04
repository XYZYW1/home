function fetchDailyVerse() {
    // Replace with a real API endpoint if needed
    const apiUrl = 'https://api.quran.com/v4/verses/random'; 

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); // Log API response to check the structure
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
