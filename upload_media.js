const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dfz5m8dzp',
  api_key: '371469553384233',
  api_secret: 'FGiGe4T-Je3NojtcWuPgKi-Ydg0'
});

const mediaExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov'];
const directoryPath = 'c:\\Users\\Admin\\Documents\\PFL';

async function uploadFiles() {
  const files = fs.readdirSync(directoryPath);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (mediaExtensions.includes(ext)) {
      const filePath = path.join(directoryPath, file);
      const publicId = path.parse(file).name;
      const resourceType = ext === '.mp4' || ext === '.mov' ? 'video' : 'image';
      
      console.log(`Uploading ${file} as ${publicId} (${resourceType})...`);
      
      try {
        let result;
        if (resourceType === 'video') {
          result = await cloudinary.uploader.upload_large(filePath, {
            public_id: publicId,
            resource_type: resourceType,
            chunk_size: 6000000, // 6MB chunks
            overwrite: true,
            invalidate: true
          });
        } else {
          result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            resource_type: resourceType,
            overwrite: true,
            invalidate: true
          });
        }
        console.log(`Successfully uploaded ${file}: ${result.secure_url}`);
      } catch (error) {
        console.error(`Error uploading ${file}:`, error);
      }
    }
  }
  console.log("All uploads complete.");
}

uploadFiles();
