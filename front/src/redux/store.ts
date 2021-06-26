import { getFriendsReducer } from './reducers/getFriendsReducer';
import { addToFriendsReducer } from './reducers/addToFriendsReducer';
import { allowedToEditReducer } from './reducers/allowedToEdit';
import { getGroupMembersReducer } from './reducers/getGroupMembersReducer';
import { getGroupCoursesReducer } from './reducers/getGroupCoursesReducer';
import { getMainGroupInfoReducer } from './reducers/getMainGroupInfoReducer';
import { scheduleReducer } from './reducers/scheduleReducer';
import { userLoginReducer } from './reducers/loginReducer';
import {createStore,combineReducers,applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import rootWatcher from "./saga/combineSagas"
import { groupsReducer } from './reducers/groupsReducer';
import { createCourseReducer } from './reducers/createCourseReducer';
import {teachersReducer} from "./reducers/teachersReducer"
import { getCoursesReducer } from './reducers/getCoursesRedcuer';
import { singleCourseReducer } from './reducers/getSingleCourseReducer';
import { searchReducer } from './reducers/searchReducer';
import { getUserReducer } from './reducers/getUserReducer';
import themeReducer from './reducers/themeReducer';
import { editNameReducer } from './reducers/editNameReducer';
import { editPasswordReducer} from './reducers/editPasswordReducer';
import modalReducer from './reducers/modalReducer';

const saga = createSagaMiddleware()

const scheduleFromStorage = localStorage.getItem("schedule")
const loginFromStorage = localStorage.getItem("login")
const themeFromStorage = localStorage.getItem("theme")

const initialState ={
    schedule: {
        loading:false,
        schedule: scheduleFromStorage?JSON.parse(scheduleFromStorage):null
    },
    login: {
        loading:false,
        user: loginFromStorage?JSON.parse(loginFromStorage):null
    }, 
    theme:{
        dark:themeFromStorage?JSON.parse(themeFromStorage):false
    }
}

const rootReducer = combineReducers({
    login: userLoginReducer,
    schedule:scheduleReducer,
    groups:groupsReducer,
    createdCourse: createCourseReducer,
    teachers: teachersReducer,
    courses:getCoursesReducer,
    singleCourse: singleCourseReducer,
    searchResults: searchReducer,
    profile:getUserReducer,
    groupInfo:getMainGroupInfoReducer,
    groupCourses:getGroupCoursesReducer,
    groupMembers: getGroupMembersReducer,
    allowedToEdit:allowedToEditReducer,
    theme:themeReducer,
    friends:addToFriendsReducer,
    friendsList:getFriendsReducer,
    editName:editNameReducer,
    editPassword:editPasswordReducer,
    modal:modalReducer

})
const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(saga)))
saga.run(rootWatcher)



export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store