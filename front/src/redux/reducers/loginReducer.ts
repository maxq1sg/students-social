import axios from 'axios';
import {call, put, takeEvery} from "redux-saga/effects"
import { EUserLogin, IAction, IUserLoginState } from './types';
import produce from "immer"





export const userLoginReducer=(state:IUserLoginState={loading:false,user:null},action:IAction)=>{
    switch(action.type){
        case(EUserLogin.USER_LOGIN_REQUEST):
            return {...state,loading:true}
        case(EUserLogin.USER_LOGIN_SUCCESS):
            return {loading:false,user:action.payload}
        case(EUserLogin.USER_LOGIN_FAILURE):
            return {loading:false,user:null,error:action.payload}
        case(EUserLogin.USER_LOGOUT):
            return {loading:false,user:null}
        case(EUserLogin.USER_FRIEND):{
            return produce(state,draft=>{
                if(action.payload.isAdd){
                    draft.user?.friends.push(action.payload.user)
                } else{
                    if(draft.user){
                        draft.user.friends = draft.user?.friends.filter(friend=>friend!==action.payload.user)
                    }
                }
            })
        }
        case(EUserLogin.USER_NAME_MODIFY):{
            return produce(state,draft=>{
                if(draft.user){
                    draft.user.name=action.payload.name
                    draft.user.fullName=action.payload.fullName
                }
            })
        }
        default: 
            return state
    }
}
function loginFetch(url:string,payload:any){
    return axios.post(url,payload)
}
function* userLoginWorker(action:IAction){
    try {
        yield put({type:EUserLogin.USER_LOGIN_REQUEST})
        const {data} = yield call(loginFetch,"/api/login",action.payload)
        yield put({type:EUserLogin.USER_LOGIN_SUCCESS,payload:data})
        localStorage.setItem("login",JSON.stringify(data))

    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EUserLogin.USER_LOGIN_FAILURE,payload:message})
    }
}

export function* userLoginWatcher(){
    yield takeEvery(EUserLogin.USER_LOGIN,userLoginWorker)
}