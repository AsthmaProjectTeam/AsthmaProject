/**
 * Created by tengzhongwei on 6/7/17.
 */
var QRCode = require('qrcode')

const h = "<html>hello world</html>";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhIiwicm9sZSI6InRlbXAiLCJpYXQiOjE0OTgxNTU3MzYsImV4cCI6MTQ5ODE1OTMzNn0.6irObKkhY-qViFU8R9a6aB_6CHztSneJCHVKDvL25gk';
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