import request from '../utils/request';
import {SERVER_HOST} from '../CONST';

export async function getPainGraphData(body) {
  const patient_id = body.patient_id;

  return request(SERVER_HOST+'/v2/patients/'+patient_id+'/pain-level', {
    method: 'GET',
    headers:{
      "Content-Type": "application/json",
      'Authorization': 'token '+ window.sessionStorage.getItem('token'),
    },
  })
}
