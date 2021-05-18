import { scheduleReducer } from './reducers/scheduleReducer';
import { userLoginReducer } from './reducers/loginReducer';
import {createStore,combineReducers,applyMiddleware} from "redux"
import navbarReducer from './reducers/navbarReducer'
import {composeWithDevTools} from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import rootWatcher from "./saga/combineSagas"
import { groupsReducer } from './reducers/groupsReducer';
import { createCourseReducer } from './reducers/createCourseReducer';
import {teachersReducer} from "./reducers/teachersReducer"
import { getCoursesReducer } from './reducers/getCoursesRedcuer';
import { singleCourseReducer } from './reducers/getSingleCourseReducer';
import { searchReducer } from './reducers/searchReducer';

const saga = createSagaMiddleware()

const scheduleFromStorage = localStorage.getItem("schedule")
const loginFromStorage = localStorage.getItem("login")

const initialState ={
    schedule: {
        loading:false,
        schedule: scheduleFromStorage?JSON.parse(scheduleFromStorage):null
    },
    login: {
        loading:false,
        user: loginFromStorage?JSON.parse(loginFromStorage):null
    }
}

const rootReducer = combineReducers({
    navbar:navbarReducer,
    login: userLoginReducer,
    schedule:scheduleReducer,
    groups:groupsReducer,
    createdCourse: createCourseReducer,
    teachers: teachersReducer,
    courses:getCoursesReducer,
    singleCourse: singleCourseReducer,
    searchResults: searchReducer
})
const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(saga)))
saga.run(rootWatcher)



export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store