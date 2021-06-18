import { call, put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { select } from 'redux-saga/effects';
import { RootState } from '../store';
import { IUser } from './types';


interface IEditPassword{
    loading:boolean,
    error?: null|string,
    success?:boolean
}
export enum EEditPasswordActionType{
    EDIT_PASSWORD="EDIT_PASSWORD",
    EDIT_PASSWORD_REQUEST="EDIT_PASSWORD_REQUEST",
    EDIT_PASSWORD_SUCCESS="EDIT_PASSWORD_SUCCESS",
    EDIT_PASSWORD_FAILURE="EDIT_PASSWORD_FAILURE",
    EDIT_PASSWORD_RESET="EDIT_PASSWORD_RESET",
}
export const editPasswordReducer = (state:IEditPassword={loading:false},action:{type:EEditPasswordActionType,payload:any}):IEditPassword=>{
    switch(action.type){
        case(EEditPasswordActionType.EDIT_PASSWORD_REQUEST):
            return {loading:true}
        case(EEditPasswordActionType.EDIT_PASSWORD_SUCCESS):
            return {loading:false,success:action.payload}
        case(EEditPasswordActionType.EDIT_PASSWORD_FAILURE):
            return {loading:false,error:action.payload}
        case(EEditPasswordActionType.EDIT_PASSWORD_RESET):
            return {loading:false}
        default: return state
        }
}

interface IFetchData{
    id:string,oldPassword:string,newPassword:string,newPasswordConfirm:string,token:string
}

function fetchEditPassword({id,oldPassword,newPassword,newPasswordConfirm,token}:IFetchData){
    console.log(id,oldPassword,newPassword,newPasswordConfirm,token)
    const config = {
        headers: {
          "Content-Type": "application/json",
          Auth: `Bearer ${token}`,
        },
      };
    return axios.post(`/api/users/${id}/editPassword`,{oldPassword,newPassword,newPasswordConfirm},config)
}

function* getScheduleWorker(action:any){
    try {
       yield put({type:EEditPasswordActionType.EDIT_PASSWORD_REQUEST})
       const {data} = yield call(fetchEditPassword,action.payload)
       yield put({type:EEditPasswordActionType.EDIT_PASSWORD_SUCCESS,payload:data})
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EEditPasswordActionType.EDIT_PASSWORD_FAILURE,payload:message})
    }
}

export function* editPasswordWatcher(){
    yield takeEvery(EEditPasswordActionType.EDIT_PASSWORD, getScheduleWorker)
}