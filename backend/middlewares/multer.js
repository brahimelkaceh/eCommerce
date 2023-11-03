const multer = require("multer");
const { StorageSharedKeyCredential } = require("@azure/storage-blob");
const {
  BlobServiceClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} = require("@azure/storage-blob");

const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.ACCOUNT_NAME,
  `${process.env.AZURE_KEY}`,
);
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.ACCOUNT_NAME}.blob.core.windows.net`,
  sharedKeyCredential,
);

// Create a SAS token for a specific container
const containerClient = blobServiceClient.getContainerClient(
  process.env.CONTAINER_NAME,
);
const sasToken = generateBlobSASQueryParameters(
  {
    containerName: process.env.CONTAINER_NAME,
    permissions: BlobSASPermissions.parse("racwd"),
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 3600 * 1000),
  },
  sharedKeyCredential,
).toString();

//const blobServiceClientWithSAS = new BlobServiceClient(`https://${process.env.ACCOUNT_NAME}.blob.core.windows.net?${sasToken}`);

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
