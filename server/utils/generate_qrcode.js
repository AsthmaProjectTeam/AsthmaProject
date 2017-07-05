/**
 * Created by tengzhongwei on 6/7/17.
 */
var QRCode = require('qrcode');

const h = "<html>hello world</html>";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhIiwicm9sZSI6InRlbXAiLCJpYXQiOjE0OTg3NTA0MDksImV4cCI6MTQ5ODc1NDAwOX0.UBH4yw5lNR04DoJ66z1eVIe0zy3usVHzPnyWoo8UuA8';
QRCode.toFile('filename.png',
   token
    ,
    {
    color: {
        dark: '#00F',  // Blue dots
        light: '#0000' // Transparent background
    }
}, function (err) {
    if (err) throw err
    console.log('done')
});