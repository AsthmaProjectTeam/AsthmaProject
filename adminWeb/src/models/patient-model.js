/**
 * Created by tengzhongwei on 7/31/17.
 */
import * as initiatorAction from '../services/initiator-action'
import {message} from 'antd';

export default {

    namespace: 'patient',

    state: {
        patient_profile:null,
        found_patients:null,
        selected_patients:null,
        qrcode_token:null

    },

    effects: {

        *getPatientProfile({payload}, {call, put}){
            const {data} = yield call(initiatorAction.getPatientProfile, payload);
            yield put({type:'putPatientProfile', payload:data})
        },

        *queryPatients({payload}, {call, put}){
            const {data} = yield call(initiatorAction.queryPatients, payload);
            yield put({type: 'putQueryPatients', payload: data});
            yield put({type:'putSelectedPatients', payload: {selected_patients:null}});
        },

        *appendPatients({payload}, {call, put}){
            const {data} = yield call(initiatorAction.appendPatients, payload);
            yield put({type:'putSelectedPatients', payload: {selected_patients:null}});
            message.success('Append Patients Success!');
        },

        *getQrCodeToken({payload}, {call, put}){
            const {data} = yield call(initiatorAction.getQrCodeToken, payload);
            yield put({type:'putQrCodeToken', payload:data});
        }

    },

    reducers: {
        putPatientProfile(state, action) {
            return { ...state, patient_profile:action.payload.profile};
        },
        putQueryPatients(state, action){
            return{ ...state,  found_patients: action.payload.patients};
        },
        putSelectedPatients(state, action){
            return { ...state, selected_patients: action.payload.selected_patients};
        },
        putQrCodeToken(state, action){
            return { ...state, qrcode_token: action.payload.token};
        }


    },

};