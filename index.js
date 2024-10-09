const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;


app.use(express.json());


const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/my_database?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));


const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const DataModel = mongoose.model('Data', dataSchema);

// API
app.post('/add-data', async (req, res) => {
    try {
        const newData = new DataModel(req.body);
        await newData.save();
        res.status(201).json({ message: 'Data saved successfully', data: newData });
    } catch (error) {
        res.status(500).json({ error: 'Error saving data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
