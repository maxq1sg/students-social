import { call, put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { select } from 'redux-saga/effects';
import { RootState } from '../store';
import { IUser } from './types';

interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string,
    name:string,
    fullName:string
}

const getUser=(state:RootState):IUser=>state.login.user
interface IEditName{
    loading:boolean,
    error?: null|string,
    success?:{name:string,fullName:string}
}
export enum EEditNameActionType{
    EDIT_NAME="EDIT_NAME",
    EDIT_NAME_REQUEST="EDIT_NAME_REQUEST",
    EDIT_NAME_SUCCESS="EDIT_NAME_SUCCESS",
    EDIT_NAME_FAILURE="EDIT_NAME_FAILURE",
    EDIT_NAME_RESET="EDIT_NAME_RESET",
}
export const editNameReducer = (state:IEditName={loading:false},action:{type:EEditNameActionType,payload:any}):IEditName=>{
    switch(action.type){
        case(EEditNameActionType.EDIT_NAME_REQUEST):
            return {loading:true}
        case(EEditNameActionType.EDIT_NAME_SUCCESS):
            return {loading:false,success:action.payload}
        case(EEditNameActionType.EDIT_NAME_FAILURE):
            return {loading:false,error:action.payload}
        case(EEditNameActionType.EDIT_NAME_RESET):
            return {loading:false}
        default: return state
        }
}

interface IFetchData{
    id:string,fullName:string,name:string,password:string,token:string
}

function fetchEditName({id,fullName,name,password,token}:IFetchData){
    const config = {
        headers: {
          "Content-Type": "application/json",
          Auth: `Bearer ${token}`,
        },
      };
    return axios.post(`/api/users/${id}/editName`,{fullName,name,password},config)
}

function* getScheduleWorker(action:any){
    try {
       yield put({type:EEditNameActionType.EDIT_NAME_REQUEST})
       const {data} = yield call(fetchEditName,action.payload)
       yield put({type:EEditNameActionType.EDIT_NAME_SUCCESS,payload:data})
       const user:ResponseGenerator = yield select(getUser)
       const {name,fullName} = data
       localStorage.setItem("login",JSON.stringify({...user,name,fullName}))
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EEditNameActionType.EDIT_NAME_FAILURE,payload:message})
    }
}

export function* editNameWatcher(){
    yield takeEvery(EEditNameActionType.EDIT_NAME, getScheduleWorker)
}