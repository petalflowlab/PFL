const https = require('https');

const urls = [
  "https://res.cloudinary.com/dfz5m8dzp/image/upload/f_auto,q_auto/v1/field.jpg",
  "https://res.cloudinary.com/dfz5m8dzp/image/upload/f_auto,q_auto/v1/Renderstaffhead",
  "https://res.cloudinary.com/dfz5m8dzp/video/upload/f_auto,q_auto/v1/PETALSTAFFmodes",
  "https://res.cloudinary.com/dfz5m8dzp/video/upload/f_auto,q_auto/v1/poi",
  "https://res.cloudinary.com/dfz5m8dzp/video/upload/f_auto,q_auto/v1/20260308_000103",
  "https://res.cloudinary.com/dfz5m8dzp/video/upload/f_auto,q_auto/v1/doubles",
  "https://res.cloudinary.com/dfz5m8dzp/video/upload/f_auto,q_auto/v1/RENDER%20",
  "https://res.cloudinary.com/dfz5m8dzp/image/upload/f_auto,q_auto/v1/CONTROL"
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`${res.statusCode === 200 ? '✅' : '❌'} ${res.statusCode} - ${url}`);
      resolve(res.statusCode === 200);
    }).on('error', (e) => {
      console.log(`❌ Error - ${url}: ${e.message}`);
      resolve(false);
    });
  });
}

async function verifyAll() {
  console.log("Verifying Cloudinary URLs...");
  for (const url of urls) {
    await checkUrl(url);
  }
}

verifyAll();
