import axios from 'axios';
import {call, put, takeEvery} from "redux-saga/effects"
import { IGroup} from './types';

export interface IGroupMainInfoState {
    loading: boolean;
    error?: string;
    group: IGroup |null
  }

export enum EGetGroupMainActionType {
    GET_GROUP_MAIN_INFO_REQUEST = "GET_GROUP_MAIN_INFO_REQUEST",
    GET_GROUP_MAIN_INFO_SUCCESS = "GET_GROUP_MAIN_INFO_SUCCESS",
    GET_GROUP_MAIN_INFO_FAILURE = "GET_GROUP_MAIN_INFO_FAILURE",
    GET_GROUP_MAIN_INFO = "GET_GROUP_MAIN_INFO",
    GET_GROUP_MAIN_INFO_RESET = "GET_GROUP_MAIN_INFO_RESET",
  }

export const getMainGroupInfoReducer=(state:IGroupMainInfoState={loading:false,group:null},action:{type:EGetGroupMainActionType,payload:any}):IGroupMainInfoState=>{
    switch(action.type){
        case(EGetGroupMainActionType.GET_GROUP_MAIN_INFO_REQUEST):
            return {group:null,loading:true}
        case(EGetGroupMainActionType.GET_GROUP_MAIN_INFO_SUCCESS):
            return {loading:false,group:action.payload}
        case(EGetGroupMainActionType.GET_GROUP_MAIN_INFO_FAILURE):
            return {loading:false,group:null,error:action.payload}
        default: 
            return state
    }
}
function mainGroupInfoFetch({id}:{id:string}){
    return axios.get(`/api/groups/${id}`)
}
function* mainGroupInfoWorker(action:any){
    try {
        yield put({type:EGetGroupMainActionType.GET_GROUP_MAIN_INFO_REQUEST})
        const {data} = yield call(mainGroupInfoFetch,action.payload)
        yield put({type:EGetGroupMainActionType.GET_GROUP_MAIN_INFO_SUCCESS,payload:data})
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EGetGroupMainActionType.GET_GROUP_MAIN_INFO_FAILURE,payload:message})
    }
}

export function* getMainGroupInfoWatcher(){
    yield takeEvery(EGetGroupMainActionType.GET_GROUP_MAIN_INFO,mainGroupInfoWorker)
}