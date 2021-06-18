import axios from 'axios';
import {call, put, takeEvery} from "redux-saga/effects"
import { IUser } from './types';

export interface IGetUserState {
    loading: boolean;
    error?: string;
    user: IUser|null;
    // resultType?: result;
  }
  export enum EGetUserActionType {
    GET_USER_REQUEST = "GET_USER_REQUEST",
    GET_USER_SUCCESS = "GET_USER_SUCCESS",
    GET_USER_FAILURE = "GET_USER_FAILURE",
    GET_USER = "GET_USER",
    GET_USER_RESET = "GET_USER_RESET",
    GET_USER_SYNC = "GET_USER_SYNC",
    
  }

export const getUserReducer=(state:IGetUserState={loading:false,user:null},action:{type:EGetUserActionType,payload:any}):IGetUserState=>{
    switch(action.type){
        case(EGetUserActionType.GET_USER_REQUEST):
            return {user:null,loading:true}
        case(EGetUserActionType.GET_USER_SUCCESS):
            return {loading:false,user:action.payload}
        case(EGetUserActionType.GET_USER_FAILURE):
            return {loading:false,user:null,error:action.payload}
        case(EGetUserActionType.GET_USER_RESET):
            return {loading:false,user:null}
        // case(EGetUserActionType.GET_USER_SYNC):{
        //     const stateCopy = {...state}
        //     if(action.payload.areFriends){
        //         stateCopy.user?.friends = stateCopy.user?.friends?.filter(item=>item!==action.payload.id)
        //     }
        //     return {...state}
        // }
            
        default: 
            return state
    }
}
function userFetch({id}:{id:string}){
    return axios.get(`/api/users/${id}`)
}
//{payload:{id:string}}
function* userWorker(action:any){
    try {
        yield put({type:EGetUserActionType.GET_USER_REQUEST})
        const {data} = yield call(userFetch,action.payload)
        yield put({type:EGetUserActionType.GET_USER_SUCCESS,payload:data})
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EGetUserActionType.GET_USER_FAILURE,payload:message})
    }
}

export function* singleUserWatcher(){
    yield takeEvery(EGetUserActionType.GET_USER,userWorker)
}