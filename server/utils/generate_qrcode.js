/**
 * Created by tengzhongwei on 6/7/17.
 */
var QRCode = require('qrcode')

const h = "<html>hello world</html>";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhIiwicm9sZSI6InRlbXAiLCJpYXQiOjE0OTgyNDEyMjIsImV4cCI6MTQ5ODI0NDgyMn0.pYwA4gGqb4NHY4rW6AZRsc5V7dCbkJjW5vcFm-1XhiA';
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