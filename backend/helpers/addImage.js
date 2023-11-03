const sharp = require("sharp"); // Import the "sharp" library

const {
  StorageSharedKeyCredential,
  BlobServiceClient,
} = require("@azure/storage-blob");
const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.ACCOUNT_NAME,
  `${process.env.AZURE_KEY}`,
);
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.ACCOUNT_NAME}.blob.core.windows.net`,
  sharedKeyCredential,
);
exports.addImages = async (images) => {
  if (images && images.length > 0) {
    const containerClient = blobServiceClient.getContainerClient(
      process.env.CONTAINER_NAME,
    );
    const uploadedImages = [];

    for (const image of images) {
      const blobName = `${Date.now()}_${image.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const imageContentType = image.mimetype;

      // Use "sharp" to convert the image to WebP format
      const webpData = await sharp(image.buffer)
        .webp({ quality: 10 }) // You can adjust the quality as needed
        .toBuffer();
      const options = {
        blobHTTPHeaders: {
          blobContentType: "image/webp", // Set the content type to WebP
        },
      };

      await blockBlobClient.upload(webpData, webpData.length, options);
      const imageUrl = `${process.env.CDN_URL}/${process.env.CONTAINER_NAME}/${blobName}`;
      console.log("Image uploaded to Azure Blob Storage:", imageUrl);
      uploadedImages.push({
        imageUrl,
        // Add other fields as needed for each image
      });
    }
    console.log(uploadedImages);
    return uploadedImages; // Return the array of uploaded images
  } else {
    console.log("No images received");
    return []; // Return an empty array if no images are provided
  }
};
