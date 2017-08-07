//when testing in laptop using this address;
//export const HOST = 'http://127.0.0.1:8080';
//export const HOST = 'http://10.67.107.157:8080';

// when testing in mobile, using this
export const HOST = 'https://dry-cliffs-50693.herokuapp.com';  //this is host of heroku

import Dimensions from 'Dimensions';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


// export const MAP = {
//     "1":{
//         "upper left": [[width*0.383, height*0.21]],
//         "upper right" : [[width*0.238, height*0.21]],
//         "belly": [[width*0.307, height*0.345]]
//     },
//     "2": {
//         "right upper back": [[width*0.404, height*0.215]],
//         "left upper back": [[width*0.264, height*0.215]],
//         "lower back": [[width*0.332, height*0.368]]
//     },
//     "3": {
//         "left side": [[width*0.232, height*0.283]]
//     },
//     "4": {
//         "right side": [[width*0.21, height*0.3]]
//     }
// };

export const MAP = {
    "1":{
        "upper left": [[width*0.504, height*0.177]],
        "upper right" : [[width*0.31, height*0.177]],
        "belly": [[width*0.40, height*0.305]]
    },
    "2": {
        "right upper back": [[width*0.528, height*0.178]],
        "left upper back": [[width*0.344, height*0.178]],
        "lower back": [[width*0.435, height*0.324]]
    },
    "3": {
        "left side": [[width*0.373, height*0.282]]
    },
    "4": {
        "right side": [[width*0.435, height*0.276]]
    }
};