/**
 * Created by tengzhongwei on 6/7/17.
 */
var QRCode = require('qrcode');

const h = "<html>hello world</html>";

const token = '1232123';
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