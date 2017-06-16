/**
 * Created by tengzhongwei on 6/7/17.
 */
var QRCode = require('qrcode')

const h = "<html>hello world</html>";

QRCode.toFile('filename.png', "https://www.google.com/search?q=qrcode+send+request&oq=qrcode+send+request&aqs=chrome..69i57.52575j0j4&sourceid=chrome&ie=UTF-8#q=qr+code+send+request+with+header", {
    color: {
        dark: '#00F',  // Blue dots
        light: '#0000' // Transparent background
    }
}, function (err) {
    if (err) throw err
    console.log('done')
})