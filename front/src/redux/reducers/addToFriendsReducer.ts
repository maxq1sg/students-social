import { RootState } from './../store';
import { call, put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { ICourse, IUser } from './types';
import { select } from 'redux-saga/effects';

interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
}

export interface IaddToFriendsState{
    loading:boolean,
    error?:string,
    areFriends?:boolean,
    done:boolean
}
export enum EAddToFriendsActionType{
    ADD_TO_FRIENDS_REQUEST="ADD_TO_FRIENDS_REQUEST",
    ADD_TO_FRIENDS_SUCCESS="ADD_TO_FRIENDS_SUCCESS",
    ADD_TO_FRIENDS_FAILURE="ADD_TO_FRIENDS_FAILURE",
    ADD_TO_FRIENDS="ADD_TO_FRIENDS",
    ADD_TO_FRIENDS_RESET="ADD_TO_FRIENDS_RESET",
}
interface IPayload{
    first:string,
    second:string
}
export const addToFriendsReducer = (state:IaddToFriendsState={loading:false,done:false},action:{type:EAddToFriendsActionType,payload:any}):IaddToFriendsState=>{
    switch(action.type){
        case(EAddToFriendsActionType.ADD_TO_FRIENDS_REQUEST):
            return {done:false,loading:true}
        case(EAddToFriendsActionType.ADD_TO_FRIENDS_SUCCESS):
            return {done:true,loading:false,areFriends:action.payload}
        case(EAddToFriendsActionType.ADD_TO_FRIENDS_FAILURE):
            return {done:false,loading:false,error:action.payload}
        case(EAddToFriendsActionType.ADD_TO_FRIENDS_RESET):
            return {done:false,loading:false}
        default: return state
        }
}
function fetchAddToFriendsCourse({first,second}:IPayload){
    return axios.get(`/api/friends?first=${first}&second=${second}`,)
}

const getUser=(state:RootState):IUser=>state.login.user

function* addToFriendsWorker(action:{type:any,payload:IPayload}){
    try {
       yield put({type:EAddToFriendsActionType.ADD_TO_FRIENDS_REQUEST})
       const {data} = yield call(fetchAddToFriendsCourse,action.payload)
       yield put({type:EAddToFriendsActionType.ADD_TO_FRIENDS_SUCCESS,payload:data})
       
       const user:ResponseGenerator = yield select(getUser)
       localStorage.setItem("login",JSON.stringify({...user,friends:data}))
       
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EAddToFriendsActionType.ADD_TO_FRIENDS_FAILURE,payload:message})
    }
}

export function* addToFriendsWatcher(){
    yield takeEvery(EAddToFriendsActionType.ADD_TO_FRIENDS, addToFriendsWorker)
}