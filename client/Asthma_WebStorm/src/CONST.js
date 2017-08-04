//when testing in laptop using this address;
//export const HOST = 'http://127.0.0.1:8080';
//export const HOST = 'http://10.67.107.157:8080';

// when testing in mobile, using this
export const HOST = 'https://dry-cliffs-50693.herokuapp.com';  //this is host of heroku

import Dimensions from 'Dimensions';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const MAP = {
    "1":{
        "upper left": [[width*0.55, height*0.2]],
        "upper right" : [[width*0.4, height*0.2]],
        "belly": [[width*0.5,height*0.35]]
    },
    "2": {
        "right upper back": [[200,120]],
        "left upper back": [[129,120]],
        "lower back": [[164,219]]
    },
    "3": {
        "left side": [[141,189]]
    },
    "4": {
        "right side": [[163,183]]
    }
};