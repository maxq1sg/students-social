import { call, put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { ICourse } from './types';


export interface ICoursesState{
    courses: ICourse[],
    loading:boolean,
    error?:string,
    done:boolean
}

export enum EGetCoursesActionType{
    GET_COURSES_REQUEST="GET_COURSES_REQUEST",
    GET_COURSES_SUCCESS="GET_COURSES_SUCCESS",
    GET_COURSES_FAILURE="GET_COURSES_FAILURE",
    COURSES_RESET="COURSES_RESET",
    GET_COURSES="GET_COURSES",
}

export const getCoursesReducer = (state:ICoursesState={loading:false,courses:[],done:false},action:{type:EGetCoursesActionType,payload:any}):ICoursesState=>{
    switch(action.type){
        case(EGetCoursesActionType.GET_COURSES_REQUEST):
            return {loading:true,courses:[],done:false}
        case(EGetCoursesActionType.GET_COURSES_SUCCESS):
            return {loading:false,courses:action.payload,done:true}
        case(EGetCoursesActionType.GET_COURSES_FAILURE):
            return {loading:false,courses:[],error:action.payload,done:false}
        case(EGetCoursesActionType.COURSES_RESET):
            return {loading:false,courses:[],done:false}
        default: return state
        }
}
function fetchCourses({userId}:{userId:string}){

    return axios.get(`/api/users/${userId}/courses`)

}

function* getCoursesWorker(action:any){
    try {
       yield put({type:EGetCoursesActionType.GET_COURSES_REQUEST})
       const {data} = yield call(fetchCourses,action.payload)
       yield put({type:EGetCoursesActionType.GET_COURSES_SUCCESS,payload:data})
        
       //LO



    //    localStorage.setItem("schedule",JSON.stringify(data))
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EGetCoursesActionType.GET_COURSES_FAILURE,payload:message})
    }
}

export function* getCoursesWatcher(){
    yield takeEvery(EGetCoursesActionType.GET_COURSES, getCoursesWorker)
}