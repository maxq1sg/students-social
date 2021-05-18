import { all } from "@redux-saga/core/effects";
import { createCourseWatcher } from "../reducers/createCourseReducer";
import { getCoursesWatcher } from "../reducers/getCoursesRedcuer";
import { singleCourseWatcher } from "../reducers/getSingleCourseReducer";
import { groupsWatcher } from "../reducers/groupsReducer";
import { userLoginWatcher } from "../reducers/loginReducer";
import { scheduleWatcher } from "../reducers/scheduleReducer";
import { searchWatcher } from "../reducers/searchReducer";
import { teachersWatcher } from "../reducers/teachersReducer";

export default function* rootWatcher(){
    yield all([userLoginWatcher(),
        scheduleWatcher(),
        groupsWatcher(),
        createCourseWatcher(),
        teachersWatcher(),
        getCoursesWatcher(),
        singleCourseWatcher(),
        searchWatcher()
    ])
}