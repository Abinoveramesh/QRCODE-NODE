const express = require('express');
const path = require('path');
const QRCode = require('qrcode');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve the PDF file
app.use('/files', express.static(path.join(__dirname, 'public')));

// Generate QR code URL
const pdfUrl = 'http://localhost:3000/files/yourfile.pdf';
const qrCodePath = path.join(__dirname, 'qrcode.png');

QRCode.toFile(qrCodePath, pdfUrl, {
  color: {
    dark: '#000000',  // Black
    light: '#FFFFFF'  // White
  }
}, (err) => {
  if (err) throw err;
  console.log('QR Code generated and saved to', qrCodePath);
});

// Serve the QR code image
app.use('/qrcode', express.static(__dirname));

app.get('/', (req, res) => {
  res.send(`
    <h1>Scan the QR code to download the PDF</h1>
    <img src="/qrcode/qrcode.png" alt="QR Code"/>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
