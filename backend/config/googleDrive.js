const { google } = require('googleapis');
const fs = require('fs');

const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : '',
  ['https://www.googleapis.com/auth/drive']
);

const drive = google.drive({ version: 'v3', auth });

/**
 * Uploads a local file to Google Drive.
 * @param {string} localFilePath - Path to the local file
 * @param {string} mimeType - The mime type of the file
 * @param {string} fileName - The name of the file on Drive
 * @returns {Promise<string>} - The webViewLink of the uploaded file
 */
async function uploadToDrive(localFilePath, mimeType, fileName) {
  try {
    const fileMetadata = {
      name: fileName,
      parents: [GOOGLE_DRIVE_FOLDER_ID]
    };

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(localFilePath)
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink'
    });

    // Make the file readable by anyone with the link so the admin can open it directly
    try {
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });
    } catch (permError) {
      console.warn('Could not set public permissions on drive file:', permError);
    }

    return response.data.webViewLink;
  } catch (error) {
    console.error('Google Drive Upload Error:', error);
    throw error;
  }
}

module.exports = { uploadToDrive };
