/**
 * Created by tengzhongwei on 7/17/17.
 */
import fetch from 'dva/fetch';
import {SERVER_HOST} from '../CONST';
import FileSaver from 'file-saver';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
function downloadRequest(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(res => res.blob())
        .then((blob)=>{
            FileSaver.saveAs(blob,'results.csv')
        });
}


export async function downloadResults(payload) {
    let url = SERVER_HOST+'/v2/csv/patients/results/?';
    const query = payload.query;
    let temp = [];
    for(let key of Object.keys(query) ){
        if(query[key]) temp.push(key+'='+query[key]);
    }
    url += temp.join('&');

    return downloadRequest(url,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            //'Authorization': payload.token
            'Authorization': 'token '+window.sessionStorage.getItem('token'),
        },
    });
}