/**
 * Created by tengzhongwei on 7/13/17.
 */
import request from '../utils/request';
import {SERVER_HOST} from '../CONST';

export async function login(body){
    return request(SERVER_HOST+'/v2/accounts/initiators/login',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
}