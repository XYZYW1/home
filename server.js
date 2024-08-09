const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/yourdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const EventSchema = new mongoose.Schema({
    date: { type: String, required: true },
    note: { type: String, required: true },
});

const Event = mongoose.model('Event', EventSchema);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to save events (notes)
app.post('/events', async (req, res) => {
    const { date, note } = req.body;

    let event = await Event.findOne({ date });
    if (event) {
        event.note = note;
    } else {
        event = new Event({ date, note });
    }
    await event.save();

    res.json(event);
});

// API to get events
app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// API to get the daily verse
app.get('/daily-verse', (req, res) => {
    const dailyVerse = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. - John 3:16";
    res.json({ verse: dailyVerse });
});

// API to get gallery images
app.get('/gallery-images', (req, res) => {
    const images = [
        '/images/pic1.jpg',
        '/images/pic2.jpg',
        '/images/pic3.jpg'
    ];
    res.json({ images });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
