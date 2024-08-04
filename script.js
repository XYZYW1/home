document.addEventListener('DOMContentLoaded', () => {
    // Date to Remember Page (date.html)
    if (document.querySelector('.date-remember')) {
        const dateElement = document.getElementById('date-to-remember');
        const specialDate = new Date('2024-08-05'); // Example special date
        const today = new Date();
        
        // Format special date and today's date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toDateString() === specialDate.toDateString()
            ? `Today's Special Date: ${specialDate.toLocaleDateString(undefined, options)}`
            : `Date to Remember: ${specialDate.toLocaleDateString(undefined, options)}`;
    }

    // Daily Verse Page (verse.html)
    if (document.querySelector('.daily-verse')) {
        const verses = [
            "This is the daily verse for today.",
            "Another inspiring verse for today.",
            "Today's verse is a source of strength.",
            "Find peace in the words of wisdom.",
            "Embrace the new day with a positive thought."
        ];
        const verseElement = document.getElementById('daily-verse');
        
        // Display a verse based on the day of the week
        const dayOfWeek = new Date().getDay();
        verseElement.textContent = verses[dayOfWeek % verses.length];
    }

    // Gallery Page (gallery.html)
    if (document.querySelector('.image-grid')) {
        const galleryImages = [
            'path-to-image1.jpg',
            'path-to-image2.jpg',
            'path-to-image3.jpg',
            'path-to-image4.jpg',
            'path-to-image5.jpg'
        ];
        const galleryElement = document.querySelector('.image-grid');

        galleryImages.forEach(imagePath => {
            const imgElement = document.createElement('img');
            imgElement.src = imagePath;
            imgElement.alt = 'Gallery Image';
            imgElement.classList.add('gallery-image');
            
            const divElement = document.createElement('div');
            divElement.classList.add('grid-item');
            divElement.appendChild(imgElement);
            galleryElement.appendChild(divElement);

            // Lightbox effect
            divElement.addEventListener('click', () => {
                openLightbox(imagePath);
            });
        });
    }

    // Lightbox Functionality
    function openLightbox(imageSrc) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.alt = 'Lightbox Image';
        lightbox.appendChild(imgElement);
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
    }
});
