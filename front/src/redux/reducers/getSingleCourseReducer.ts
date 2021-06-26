import { call, put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { ICourse } from './types';

export interface ISingleCourseState{
    loading:boolean,
    error?:any,
    course:ICourse|null,
    success:boolean
}
export enum ESingleCourseActionType{
    GET_SINGLE_COURSE_REQUEST="GET_SINGLE_COURSE_REQUEST",
    GET_SINGLE_COURSE_SUCCESS="GET_SINGLE_COURSE_SUCCESS",
    GET_SINGLE_COURSE_FAILURE="GET_SINGLE_COURSE_FAILURE",
    GET_SINGLE_COURSE="GET_SINGLE_COURSE",
    GET_SINGLE_COURSE_RESET="GET_SINGLE_COURSE_RESET",
}
interface IPayload{
    course:string,
    user:string
}
export const singleCourseReducer = (state:ISingleCourseState={loading:false,course:null,success:false},action:{type:ESingleCourseActionType,payload:any}):ISingleCourseState=>{
    switch(action.type){
        case(ESingleCourseActionType.GET_SINGLE_COURSE_REQUEST):
            return {success:false,loading:true,course:null}
        case(ESingleCourseActionType.GET_SINGLE_COURSE_SUCCESS):
            return {success:true,loading:false,course:action.payload}
        case(ESingleCourseActionType.GET_SINGLE_COURSE_FAILURE):
            return {success:false,loading:false,course:null,error:action.payload}
        case(ESingleCourseActionType.GET_SINGLE_COURSE_RESET):
            return {success:false,loading:false,course:null}
        default: return state
        }
}
function fetchSingleCourse({user,course}:IPayload){
    return axios.get(`/api/courses/${course}?user=${user}`,)
}

function* singleCourseWorker(action:{type:any,payload:IPayload}){
    try {
       yield put({type:ESingleCourseActionType.GET_SINGLE_COURSE_REQUEST})
       const {data} = yield call(fetchSingleCourse,action.payload)
       yield put({type:ESingleCourseActionType.GET_SINGLE_COURSE_SUCCESS,payload:data})        
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:ESingleCourseActionType.GET_SINGLE_COURSE_FAILURE,payload:message})
    }
}

export function* singleCourseWatcher(){
    yield takeEvery(ESingleCourseActionType.GET_SINGLE_COURSE, singleCourseWorker)
}