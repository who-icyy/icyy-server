const express = require('express');
const axios = require('axios');
const app = express();

async function getPublicIPLocation() {
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');

      const publicIP = ipResponse.data.ip;
      
      const locationResponse = await axios.get(`https://ipinfo.io/${publicIP}/json?token=YOUR_TOKEN`);

      console.table(locationResponse.data)

      

    } catch (error) {
      console.error('Error:', error.message);
    }
  }

app.set("trust proxy", true);

app.get('/', (req, res) => {
    getPublicIPLocation()
});


const PORT = 3000;
const HOST = "YOUR IP ADDRESS";
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
