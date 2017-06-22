/**
 * Created by tengzhongwei on 6/7/17.
 */
var QRCode = require('qrcode')

const h = "<html>hello world</html>";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhIiwicm9sZSI6InRlbXAiLCJpYXQiOjE0OTgxNjg1OTgsImV4cCI6MTQ5ODE3MjE5OH0.ai2SSdl32IG6e_tAsC65ttmgkbLNd8BtuNUYn67XhH8';
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