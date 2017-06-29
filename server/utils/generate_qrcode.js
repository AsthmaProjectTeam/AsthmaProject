/**
 * Created by tengzhongwei on 6/7/17.
 */
var QRCode = require('qrcode')

const h = "<html>hello world</html>";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhIiwicm9sZSI6InRlbXAiLCJpYXQiOjE0OTg2OTk5MDUsImV4cCI6MTQ5ODcwMzUwNX0.PJn20FnlsZHrVrpX6z4rg1P3xTRV4kNFSJ67p5_392U';
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
})