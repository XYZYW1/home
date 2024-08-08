const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/calendar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema for calendar events
const eventSchema = new mongoose.Schema({
    date: String,
    note: String
});

const Event = mongoose.model('Event', eventSchema);

// API to get all events
app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// API to save a new event or update an existing one
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

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
