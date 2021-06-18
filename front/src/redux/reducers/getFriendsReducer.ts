import { call, put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { ICourse, IUser } from './types';


export interface IFriendsState{
    friends: IUser[]|null,
    loading?:boolean,
    error?:string,
    
}

export enum EGetFriendsActionType{
    GET_FRIENDS_REQUEST="GET_FRIENDS_REQUEST",
    GET_FRIENDS_SUCCESS="GET_FRIENDS_SUCCESS",
    GET_FRIENDS_FAILURE="GET_FRIENDS_FAILURE",
    FRIENDS_RESET="FRIENDS_RESET",
    GET_FRIENDS="GET_FRIENDS",
}

export const getFriendsReducer = (state:IFriendsState={friends:null},action:{type:EGetFriendsActionType,payload:any}):IFriendsState=>{
    switch(action.type){
        case(EGetFriendsActionType.GET_FRIENDS_REQUEST):
            return {loading:true,friends:null}
        case(EGetFriendsActionType.GET_FRIENDS_SUCCESS):
            return {loading:false,friends:action.payload}
        case(EGetFriendsActionType.GET_FRIENDS_FAILURE):
            return {loading:false,friends:null,error:action.payload}
        case(EGetFriendsActionType.FRIENDS_RESET):
            return {loading:false,friends:null}
        default: return state
        }
}
function fetchFriends({userId}:{userId:string}){

    return axios.get(`/api/users/${userId}/friends`)

}

function* getFriendsWorker(action:any){
    try {
       yield put({type:EGetFriendsActionType.GET_FRIENDS_REQUEST})
       const {data} = yield call(fetchFriends,action.payload)
       yield put({type:EGetFriendsActionType.GET_FRIENDS_SUCCESS,payload:data})
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EGetFriendsActionType.GET_FRIENDS_FAILURE,payload:message})
    }
}

export function* getFriendsWatcher(){
    yield takeEvery(EGetFriendsActionType.GET_FRIENDS, getFriendsWorker)
}