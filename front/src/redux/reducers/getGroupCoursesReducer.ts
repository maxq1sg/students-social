import axios from 'axios';
import {call, put, takeEvery} from "redux-saga/effects"
import { ICourse, } from './types';

export interface IGroupCoursesState {
    loading: boolean;
    error?: string;
    courses: ICourse[]
    // resultType?: result;
  }
  export enum EGetGroupCoursesActionType {
    GET_GROUP_COURSES_REQUEST = "GET_GROUP_COURSES_REQUEST",
    GET_GROUP_COURSES_SUCCESS = "GET_GROUP_COURSES_SUCCESS",
    GET_GROUP_COURSES_FAILURE = "GET_GROUP_COURSES_FAILURE",
    GET_GROUP_COURSES = "GET_GROUP_COURSES",
    GET_GROUP_COURSES_RESET = "GET_GROUP_COURSES_RESET",
  }

export const getGroupCoursesReducer=(state:IGroupCoursesState={loading:false,courses:[]},action:{type:EGetGroupCoursesActionType,payload:any}):IGroupCoursesState=>{
    switch(action.type){
        case(EGetGroupCoursesActionType.GET_GROUP_COURSES_REQUEST):
            return {courses:[],loading:true}
        case(EGetGroupCoursesActionType.GET_GROUP_COURSES_SUCCESS):
            return {loading:false,courses:action.payload}
        case(EGetGroupCoursesActionType.GET_GROUP_COURSES_FAILURE):
            return {loading:false,courses:[],error:action.payload}
        case(EGetGroupCoursesActionType.GET_GROUP_COURSES_RESET):
            return {courses:[],loading:false}
        default: 
            return state
    }
}
function groupCoursesFetch({id}:{id:string}){
    return axios.get(`/api/groups/${id}/courses`)
}
function* groupCoursesWorker(action:any){
    try {
        yield put({type:EGetGroupCoursesActionType.GET_GROUP_COURSES_REQUEST})
        const {data} = yield call(groupCoursesFetch,action.payload)
        yield put({type:EGetGroupCoursesActionType.GET_GROUP_COURSES_SUCCESS,payload:data})
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EGetGroupCoursesActionType.GET_GROUP_COURSES_FAILURE,payload:message})
    }
}

export function* groupCoursesWatcher(){
    yield takeEvery(EGetGroupCoursesActionType.GET_GROUP_COURSES,groupCoursesWorker)
}