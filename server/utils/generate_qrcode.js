/**
 * Created by tengzhongwei on 6/7/17.
 */
var QRCode = require('qrcode');

const h = "<html>hello world</html>";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbml0aWF0b3JfaWQiOjIsInJvbGUiOiJ0ZW1wIiwicGF0aWVudF9pZCI6IjcxIiwiaWF0IjoxNDk5Mzc5NzQ0LCJleHAiOjE0OTkzODMzNDR9.qQgAPMug5EWoTLW-fI0390qjJtU5apBB399H5mluYpI';
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