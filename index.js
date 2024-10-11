const express = require('express');
const axios = require('axios');
const geoip = require('geoip-lite')
const app = express();

app.set("trust proxy", true);

async function getPublicIPLocation() {
  try {
    const ipResponse = await axios.get('https://api.ipify.org?format=json');

    const publicIP = ipResponse.data.ip;


    dns.reverse(publicIP, (err, hostnames) => {
      if (err) {
        console.error(`Error: ${err.message}`);
      } else {
        console.log(`Hostnames for IP ${publicIP}: ${hostnames.join(', ')}`);
      }
    });

    // If you Do not want to use API then uncomment this Andcomment locationResponse

    // const geo = geoip.lookup(publicIP) 

    // console.table(geo)


    const locationResponse = await axios.get(`https://ipinfo.io/${publicIP}/json?token=YOUR_TOKEN`);

    console.table(locationResponse.data)

  } catch (error) {
    console.error('Error:', error.message);
  }
}


app.get('/', () => {
  getPublicIPLocation()
});


const PORT = 3000;
const HOST = "YOUR IP ADDRESS";
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
