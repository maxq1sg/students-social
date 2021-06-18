import axios from 'axios';
import {call, put, takeEvery} from "redux-saga/effects"
import { IGroup, IUser } from './types';

export interface IAllowedToEditState {
    loading: boolean;
    error?: string;
    data: IUser|null
  }
  export enum EAllowedToEditActionType {
    ALLOWED_TO_EDIT_REQUEST = "ALLOWED_TO_EDIT_REQUEST",
    ALLOWED_TO_EDIT_SUCCESS = "ALLOWED_TO_EDIT_SUCCESS",
    ALLOWED_TO_EDIT_FAILURE = "ALLOWED_TO_EDIT_FAILURE",
    ALLOWED_TO_EDIT = "ALLOWED_TO_EDIT",
    ALLOWED_TO_EDIT_RESET = "ALLOWED_TO_EDIT_RESET",
  }

export const allowedToEditReducer=(state:IAllowedToEditState={loading:false,data:null},action:{type:EAllowedToEditActionType,payload:any}):IAllowedToEditState=>{
    switch(action.type){
        case(EAllowedToEditActionType.ALLOWED_TO_EDIT_REQUEST):
            return {loading:true,data:null}
        case(EAllowedToEditActionType.ALLOWED_TO_EDIT_SUCCESS):
            return {loading:false,data:action.payload}
        case(EAllowedToEditActionType.ALLOWED_TO_EDIT_FAILURE):
            return {loading:false,error:action.payload,data:null}
        case(EAllowedToEditActionType.ALLOWED_TO_EDIT_RESET):
            return {loading:false,data:null}
        default: 
            return state
    }
}
function allowedToEditFetch({idToEdit,idFromLogin}:{idToEdit:string,idFromLogin:string}){
    return axios.get(`/api/users/${idToEdit}/edit?idFromLogin=${idFromLogin}`)
}
function* allowedToEditWorker(action:any){
    try {
        yield put({type:EAllowedToEditActionType.ALLOWED_TO_EDIT_REQUEST})
        const {data} = yield call(allowedToEditFetch,action.payload)
        yield put({type:EAllowedToEditActionType.ALLOWED_TO_EDIT_SUCCESS,payload:data})
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EAllowedToEditActionType.ALLOWED_TO_EDIT_FAILURE,payload:message})
    }
}

export function* allowedToEditWatcher(){
    yield takeEvery(EAllowedToEditActionType.ALLOWED_TO_EDIT,allowedToEditWorker)
}