import { Alert, AsyncStorage } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { Actions } from 'react-native-router-flux';

let globalerrorhandling = function (res) {
    if(!res.ok){
        if(res.status == 401){
            console.log('I come from global error handler');
            AsyncStorage.removeItem('loginToken');
            Actions.pop();
            Actions.dummy();
            throw Error(res.statusText);
        } else if(res.status == 400){
            console.log('400 error');
            throw Error(res.statusText);
        } else if(res.status == 500){
            alert("Operation failed. Please make sure your submitted answer is valide.");
            throw Error(res.statusText);
        } else {
            console.log('i do not know what error this is');
            throw Error(res.statusText);
        }
    }else{
        return res;
    }

};

global.globalerrorhandling = globalerrorhandling;