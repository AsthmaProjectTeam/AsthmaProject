import * as auth from '../services/authentication'
import * as fileManipulation from '../services/file-manipulation';
import * as initiatorAction from '../services/initiator-action';

import {browserHistory} from 'dva/router'
import {message} from 'antd'
export default {

  namespace: 'admin',

  state: {
      username: null,
      //token: null,
      id:null,
      uploadProgress:0,
      advanceSearch:false,
      selectedMenu:null,
      profile: null,

  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *login({ payload }, { call, put }) {  // eslint-disable-line
      try{
          const {data} = yield call(auth.login, payload);
          //yield put({type:'saveToken', payload: data};
          window.sessionStorage.setItem('token', data.token);
          browserHistory.push('/upload');

      } catch (err){
        message.error('Invalid Username/Password!');
      }
    },

    *createNewPatient({ payload },  { call, put }){
        try {
            const {data} = yield call(initiatorAction.createNewPatient, payload);
            yield call(initiatorAction.appendQuestionSet, {id: data.patient._id});
            yield call(initiatorAction.appendPatients, {patients_id: [data.patient._id]});
            message.success('Upload Success!');
        } catch (err){
            message.error('Create new patient failed!');
            throw err;
        }
    },


    *downloadResults({payload}, {call, put}){
        yield call(fileManipulation.downloadResults, payload);
    },

    *getDoctorProfile({payload}, {call, put}){
        const {data} = yield call(initiatorAction.getDoctorProfile, payload);
        yield put({type:'putProfile', payload:data})
    }


  },

  reducers: {
    saveToken(state, action) {
      return { ...state, ...action.payload };
    },
    uploadFinish(state,action){
        return {...state, ...action.payload};
    },
    toggleAdvanceSearch(state, action){
        return {...state, advanceSearch:action.payload.advanceSearch};
    },
      menuClick(state, action){
        return {...state, selectedMenu:action.payload.selectedMenu};
      },
      putProfile(state, action){
          return {...state, profile:action.payload.profile};
      }
  },

};
