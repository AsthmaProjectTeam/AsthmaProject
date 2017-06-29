// import { AsyncStorage } from 'react-native';
//
// let storage = AsyncStorage.getItem('loginToken')
//     .catch(function (error) {
//         if(error.prototype.number == 401){
//             fetch('http://10.67.125.236:8080/v2/admin/refresh', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept' : 'application/json'
//                 }
//             }).then(function (response) {
//                 AsyncStorage.setItem("loginToken", response.token)
//             }).catch((error) => {
//                 console.error(error);
//             });
//         }
//     });
//
// global.storage = storage;