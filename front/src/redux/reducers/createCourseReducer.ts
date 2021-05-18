 import { ICreatedCourse, ECreateCourseActionType, ICourse } from './types';
import { call, put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
export const createCourseReducer = (state:ICreatedCourse={loading:false,course:null},action:{type:ECreateCourseActionType,payload:any}):ICreatedCourse=>{
    switch(action.type){
        case(ECreateCourseActionType.CREATE_COURSE_REQUEST):
            return {loading:true,course:null}
        case(ECreateCourseActionType.CREATE_COURSE_SUCCESS):
            return {loading:false,course:action.payload}
        case(ECreateCourseActionType.CREATE_COURSE_FAILURE):
            return {loading:false,course:null,error:action.payload}
        default: return state
        }
}
function fetchCreateCourse(data:ICourse){
    return axios.post("/api/courses/new",data)
}

function* postCourseWorker(action:any){
    console.log(action.payload)
    try {
       yield put({type:ECreateCourseActionType.CREATE_COURSE_REQUEST})
       const {data} = yield call(fetchCreateCourse,action.payload)
       yield put({type:ECreateCourseActionType.CREATE_COURSE_SUCCESS,payload:data})        
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:ECreateCourseActionType.CREATE_COURSE_FAILURE,payload:message})
    }
}

export function* createCourseWatcher(){
    yield takeEvery(ECreateCourseActionType.CREATE_COURSE, postCourseWorker)
}