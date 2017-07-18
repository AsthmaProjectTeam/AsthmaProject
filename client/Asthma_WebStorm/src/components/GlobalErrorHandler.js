let globalerrorhandling = function (res) {
    if(!res.ok){
        if(res.status == 401){
            //alert("Sorry, your login info is expired.");
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