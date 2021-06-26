import axios from 'axios';
import {call, put, takeEvery} from "redux-saga/effects"
import { IUser } from './types';

export interface IGroupMembersState {
    loading: boolean;
    error?: string;
    members: IUser[]
    // resultType?: result;
  }
  export enum EGetGroupMebersActionType {
    GET_GROUP_MEMBERS_REQUEST = "GET_GROUP_MEMBERS_REQUEST",
    GET_GROUP_MEMBERS_SUCCESS = "GET_GROUP_MEMBERS_SUCCESS",
    GET_GROUP_MEMBERS_FAILURE = "GET_GROUP_MEMBERS_FAILURE",
    GET_GROUP_MEMBERS = "GET_GROUP_MEMBERS",
    GET_GROUP_MEMBERS_RESET = "GET_GROUP_MEMBERS_RESET",
  }

export const getGroupMembersReducer=(state:IGroupMembersState={loading:false,members:[]},action:{type:EGetGroupMebersActionType,payload:any}):IGroupMembersState=>{
    switch(action.type){
        case(EGetGroupMebersActionType.GET_GROUP_MEMBERS_REQUEST):
            return {members:[],loading:true}
        case(EGetGroupMebersActionType.GET_GROUP_MEMBERS_SUCCESS):
            return {loading:false,members:action.payload}
        case(EGetGroupMebersActionType.GET_GROUP_MEMBERS_FAILURE):
            return {loading:false,members:[],error:action.payload}
        case(EGetGroupMebersActionType.GET_GROUP_MEMBERS_RESET):
            return {members:[],loading:false}
        default: 
            return state
    }
}
function groupMembersFetch({id}:{id:string}){
    return axios.get(`/api/groups/${id}/members`)
}
function* groupMembersWorker(action:any){
    try {
        yield put({type:EGetGroupMebersActionType.GET_GROUP_MEMBERS_REQUEST})
        const {data} = yield call(groupMembersFetch,action.payload)
        yield put({type:EGetGroupMebersActionType.GET_GROUP_MEMBERS_SUCCESS,payload:data})
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EGetGroupMebersActionType.GET_GROUP_MEMBERS_FAILURE,payload:message})
    }
}

export function* groupMembersWatcher(){
    yield takeEvery(EGetGroupMebersActionType.GET_GROUP_MEMBERS,groupMembersWorker)
}