import { IteachersAction, IteachersState, EGetTechersActionType } from './types';
import axios from 'axios';
import {call, put, takeEvery} from "redux-saga/effects"


export const teachersReducer=(state:IteachersState={loading:false,teachers:[]},action:IteachersAction):IteachersState=>{
    switch(action.type){
        case(EGetTechersActionType.GET_TEACHERS_REQUEST):
            return {teachers:[],loading:true}
        case(EGetTechersActionType.GET_TEACHERS_SUCCESS):
            return {loading:false,teachers:action.payload}
        case(EGetTechersActionType.GET_TEACHERS_FAILURE):
            return {loading:false,teachers:[],error:action.payload}
        default: 
            return state
    }
}
function teachersFetch(url:string){
    return axios.get(url)
}
function* teachersWorker(action:IteachersAction){
    try {
        yield put({type:EGetTechersActionType.GET_TEACHERS_REQUEST})
        const {data} = yield call(teachersFetch,"/api/users/teachers")
        yield put({type:EGetTechersActionType.GET_TEACHERS_SUCCESS,payload:data})

    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EGetTechersActionType.GET_TEACHERS_FAILURE,payload:message})
    }
}

export function* teachersWatcher(){
    yield takeEvery(EGetTechersActionType.GET_TEACHERS,teachersWorker)
}