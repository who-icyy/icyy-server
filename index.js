const express = require('express');
const axios = require('axios');
const geoip = require('geoip-lite');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const app = express();

app.set("trust proxy", true);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();



async function getPublicIPLocation() {
  try {
    const ipResponse = await axios.get('https://api.ipify.org?format=json');

    const publicIP = ipResponse.data.ip;

    // If you Do not want to use API then uncomment this Andcomment locationResponse

    // const geo = geoip.lookup(publicIP) 

    // console.table(geo)


    const locationResponse = await axios.get(`https://ipinfo.io/${publicIP}/json?token=YOUR_TOKEN`);

    db.collection('ip-address').add(locationResponse.data)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });

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
