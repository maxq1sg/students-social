import { call, put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import { IScheduleState, EScheduleActionType } from './types';
export const scheduleReducer = (state:IScheduleState={loading:false,schedule:null},action:{type:EScheduleActionType,payload:any}):IScheduleState=>{
    switch(action.type){
        case(EScheduleActionType.SCHEDULE_REQUEST):
            return {loading:true,schedule:null}
        case(EScheduleActionType.SCHEDULE_SUCCESS):
            return {loading:false,schedule:action.payload}
        case(EScheduleActionType.SCHEDULE_FAILURE):
            return {loading:false,schedule:null,error:action.payload}
        case(EScheduleActionType.RESET_SCHEDULE):
            return {loading:false,schedule:null}
        default: return state
        }
}
function fetchSchedule({year,short,token}:any){
    const config = {
        headers: {
          "Content-Type": "application/json",
          Auth: `Bearer ${token}`,
        },
      };
    return axios.post("/api/schedule",{year,short},config)
}

function* getScheduleWorker(action:any){
    try {
       yield put({type:EScheduleActionType.SCHEDULE_REQUEST})
       const {data} = yield call(fetchSchedule,action.payload)
       yield put({type:EScheduleActionType.SCHEDULE_SUCCESS,payload:data})
        
    //    localStorage.setItem("schedule",JSON.stringify(data))
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        yield put({type:EScheduleActionType.SCHEDULE_FAILURE,payload:message})
    }
}

export function* scheduleWatcher(){
    yield takeEvery(EScheduleActionType.GET_SCHEDULE, getScheduleWorker)
}