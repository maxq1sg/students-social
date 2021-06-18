import { all } from "@redux-saga/core/effects";
import { createCourseWatcher } from "../reducers/createCourseReducer";
import { getCoursesWatcher } from "../reducers/getCoursesRedcuer";
import { singleCourseWatcher } from "../reducers/getSingleCourseReducer";
import { singleUserWatcher } from "../reducers/getUserReducer";
import { groupsWatcher } from "../reducers/groupsReducer";
import { userLoginWatcher } from "../reducers/loginReducer";
import { scheduleWatcher } from "../reducers/scheduleReducer";
import { searchWatcher } from "../reducers/searchReducer";
import { teachersWatcher } from "../reducers/teachersReducer";
import {getMainGroupInfoWatcher} from "../reducers/getMainGroupInfoReducer"
import { groupCoursesWatcher } from "../reducers/getGroupCoursesReducer";
import { groupMembersWatcher } from "../reducers/getGroupMembersReducer";
import { allowedToEditWatcher } from "../reducers/allowedToEdit";
import { addToFriendsWatcher } from "../reducers/addToFriendsReducer";
import { getFriendsWatcher } from "../reducers/getFriendsReducer";
import { editNameWatcher } from "../reducers/editNameReducer";
import { editPasswordWatcher } from "../reducers/editPasswordReducer";

export default function* rootWatcher(){
    yield all([userLoginWatcher(),
        scheduleWatcher(),
        groupsWatcher(),
        createCourseWatcher(),
        teachersWatcher(),
        getCoursesWatcher(),
        singleCourseWatcher(),
        searchWatcher(),
        singleUserWatcher(),
        getMainGroupInfoWatcher(),
        groupCoursesWatcher(),
        groupMembersWatcher(),
        allowedToEditWatcher(),
        addToFriendsWatcher(),
        getFriendsWatcher(),
        editNameWatcher(),
        editPasswordWatcher()
    ])
}