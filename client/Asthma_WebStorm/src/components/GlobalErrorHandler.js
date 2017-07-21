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
            // Alert.alert(
            //     'Error',
            //     'Sorry your login info is expired. Please ask for your doctor a new QR code to register your phone.',
            //     [
            //         {text: 'OK', onPress: () => {
            //             AsyncStorage.removeItem('loginToken');
            //             Actions.pop();
            //             Actions.dummy();
            //         }},
            //     ],
            //     { cancelable: false }
            // );
            throw Error(res.statusText);
        } else if(res.status == 400){
            console.log('400 error');
            throw Error(res.statusText);
        } else if(res.status == 500){
            console.log('500 error');
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