/**
 * Created by tengzhongwei on 7/23/17.
 */
import request from '../utils/request';
import {SERVER_HOST} from '../CONST';

export async function createNewPatient(body) {
    return request(SERVER_HOST+'/v2/initiators/patients/new',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            //'Authorization': body.token
            'Authorization': 'token '+ window.sessionStorage.getItem('token'),
        },
        body: JSON.stringify(body.form),
    })
}

export async function appendQuestionSet(body) {
    return request(SERVER_HOST+'/v2/initiators/patients/question-set',{
            method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            //'Authorization': body.token
            'Authorization': 'token '+ window.sessionStorage.getItem('token'),
        },
        body: JSON.stringify({patient_list:[body.id], q_list:[16]}),
    })
}
// export async function appendPatients(body) {
//     return request(SERVER_HOST+'/v2/initiators/patients/add',{
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             //'Authorization': body.token
//             'Authorization': 'token '+ window.sessionStorage.getItem('token'),
//         },
//         body: JSON.stringify({patients_id: body.patients_id }),
//     })
// }

export async function getDoctorProfile(body) {

    return request(SERVER_HOST+ '/v2/initiators/profile',{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            //'Authorization': body.token
            'Authorization': 'token '+ window.sessionStorage.getItem('token'),
        },
    })
}

export async function getPatientProfile(body) {
    const patient_id = body.patient_id;
    return request(SERVER_HOST+'/v2/initiators/patients/'+patient_id+'/profile',{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                //'Authorization': body.token
                'Authorization': 'token '+ window.sessionStorage.getItem('token'),
            },
        }
    )
}

export async function queryPatients(body) {
    const first_name = body.first_name;
    const last_name = body.last_name;
    return request(SERVER_HOST+'/v2/initiators/patients/query',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'token '+ window.sessionStorage.getItem('token'),
        },
        body: JSON.stringify(body),
    });
}

export async function appendPatients(body) {
    const patients_id = body.patients_id;
    return request(SERVER_HOST+'/v2/initiators/patients/add',{
        method: 'PATCH',
        headers:{
            "Content-Type": "application/json",
            'Authorization': 'token '+ window.sessionStorage.getItem('token'),
        },
        body: JSON.stringify(body)
    });
}

export async function getQrCodeToken(body) {
    const patient_id = body.patient_id;
    return request(SERVER_HOST+'/v2/accounts/patients/'+patient_id+'/register/temp-token', {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
            'Authorization': 'token '+ window.sessionStorage.getItem('token'),
        },
    })
}

export async function answerQuestion(body) {
    const patient_id = body.patient_id;
    const results = body.results;
    return request(SERVER_HOST+'/v2/initiators/patients/'+patient_id+'/results',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            'Authorization': 'token '+ window.sessionStorage.getItem('token'),
        },
        body:JSON.stringify(results),
    });

}

