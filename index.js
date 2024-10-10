const express = require('express');
const axios = require('axios');
const dotenv = require("dotenv");
const app = express();

async function getLocation(ip) {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching location:', error);
    }
}

app.set("trust proxy", true);

app.use((req, resp, next) => {
    const ip = req.ip;
    getLocation(ip);
    
})

app.get('/', (req, res) => {
    res.send('Hello, World! This is a simple web server using Express.js');
});


const PORT = 3000;
const HOST = process.env.IP;
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
