//when testing in laptop using this address;
//export const HOST = 'http://127.0.0.1:8080';
//export const HOST = 'http://10.67.107.157:8080';

// when testing in mobile, using this
export const HOST = 'https://dry-cliffs-50693.herokuapp.com';  //this is host of heroku

import Dimensions from 'Dimensions';
const width = Dimensions.get('window').width; //虽然坐标都更新了，但是因为dimensions在转屏幕的时候没有更新所以点的还是按照原来的长宽。改法：不按屏幕按图片比例
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

export const MAP_V = {
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


export const MAP_VH = {
    "1":{
        "upper left": [[width*0.583, height*0.141]],
        "upper right" : [[width*0.488, height*0.141]],
        "belly": [[width*0.538, height*0.23]]
    },
    "2": {
        "right upper back": [[width*0.604, height*0.141]],
        "left upper back": [[width*0.505, height*0.141]],
        "lower back": [[width*0.555, height*0.244]]
    },
    "3": {
        "left side": [[width*0.527, height*0.213]]
    },
    "4": {
        "right side": [[width*0.549, height*0.212]]
    }
};

export const MAP_H = {
    "1":{
        "upper left": [[width*0.4375, height*0.1875]],
        "upper right" : [[width*0.375, height*0.1875]],
        "belly": [[width*0.403, height*0.307]]
    },
    "2": {
        "right upper back": [[width*0.453, height*0.1875]],
        "left upper back": [[width*0.379, height*0.1875]],
        "lower back": [[width*0.416, height*0.3255]]
    },
    "3": {
        "left side": [[width*0.3955, height*0.284]]
    },
    "4": {
        "right side": [[width*0.435, height*0.283]]
    }
};

export const MAP_HV = {
    "1":{
        "upper left": [[width*0.351, height*0.251]],
        "upper right" : [[width*0.256, height*0.251]],
        "belly": [[width*0.303, height*0.408]]
    },
    "2": {
        "right upper back": [[width*0.367, height*0.257]],
        "left upper back": [[width*0.271, height*0.257]],
        "lower back": [[width*0.316, height*0.435]]
    },
    "3": {
        "left side": [[width*0.29, height*0.384]]
    },
    "4": {
        "right side": [[width*0.314, height*0.375]]
    }
};