import axios from 'axios';
import {call, put, takeEvery} from "redux-saga/effects"
import { EUserLogin, IAction, IUserLoginState, IGroupsState, EGroupsActionType, IGroupsAction } from './types';


export const groupsReducer=(state:IGroupsState={loading:false,groups:[]},action:IGroupsAction)=>{
    switch(action.type){
        case(EGroupsActionType.GROUPS_REQUEST):
            return {groups:[],loading:true}
        case(EGroupsActionType.GROUPS_SUCCESS):
            return {loading:false,groups:action.payload}
        case(EGroupsActionType.GROUPS_FAILURE):
            return {loading:false,groups:[],error:action.payload}
        default: 
            return state
    }
}
function groupsFetch(url:string){
    return axios.get(url)
}
function* groupsWorker(action:IGroupsAction){
    try {
        yield put({type:EGroupsActionType.GROUPS_REQUEST})
        const {data} = yield call(groupsFetch,"/api/groups")
        yield put({type:EGroupsActionType.GROUPS_SUCCESS,payload:data})

    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EGroupsActionType.GROUPS_FAILURE,payload:message})
    }
}

export function* groupsWatcher(){
    yield takeEvery(EGroupsActionType.GET_GROUPS,groupsWorker)
}