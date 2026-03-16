const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dfz5m8dzp',
  api_key: '371469553384233',
  api_secret: 'FGiGe4T-Je3NojtcWuPgKi-Ydg0'
});

async function checkAssets() {
  try {
    console.log("Listing assets in Cloudinary...");
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: '',
      max_results: 500
    });
    console.log(`Found ${result.resources.length} resources.`);
    result.resources.forEach(res => {
      console.log(`- ${res.public_id} (${res.resource_type})`);
    });
  } catch (error) {
    console.error("Error listing assets:", error);
  }
}

checkAssets();
