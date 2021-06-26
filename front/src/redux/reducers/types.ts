export enum EUserLogin{
    USER_LOGIN_REQUEST="USER_LOGIN_REQUEST",
    USER_LOGIN_SUCCESS="USER_LOGIN_SUCCESS",
    USER_LOGIN_FAILURE="USER_LOGIN_FAILURE",
    USER_LOGIN="USER_LOGIN",
    USER_LOGOUT="USER_LOGOUT",
    PUSH_NEW_USER_COURSE="PUSH_NEW_USER_COURSE",
    USER_FRIEND="USER_FRIEND",
    USER_NAME_MODIFY="USER_NAME_MODIFY"
}
export interface IGroup {
    profession: string;
    year: number;
    short: string;
    _id: string;
  };
export interface IAction{
    type:EUserLogin,
    payload:any
}
export interface IUser{
    name:string,
    courses:any[],
    dialogs:any[],
    group: any,
    teacher:boolean,
    id:string,
    fullName:string,
    token?:string,
    _id:string,
    friends:any[]
}
export interface ICourse{
    _id:string,
    teachers:any[],
    groups:any[],
    name:string,
    password:string,
    beginDate:string,
    endDate:string,
    description:string,
    tasks:any[]
}

export interface IUserLoginState{
    loading:boolean,
    user: IUser|null,
    error?:string
}

export enum EScheduleActionType{
    SCHEDULE_REQUEST="SCHEDULE_REQUEST",
    SCHEDULE_SUCCESS="SCHEDULE_SUCCESS",
    SCHEDULE_FAILURE="SCHEDULE_FAILURE",
    RESET_SCHEDULE="RESET_SCHEDULE",
    GET_SCHEDULE="GET_SCHEDULE",
}

export interface IScheduleState{
    loading:boolean,
    schedule:any[]|null,
    error?:string
}

export enum EGroupsActionType{
    GROUPS_REQUEST="GROUPS_REQUEST",
    GROUPS_SUCCESS="GROUPS_SUCCESS",
    GROUPS_FAILURE="GROUPS_FAILURE",
    GET_GROUPS="GET_GROUPS",
}

export interface IGroupsState{
    loading:boolean,
    groups:any[],
    error?:string
}

export interface IGroupsAction{
    type:EGroupsActionType,
    payload:any
}
export interface ICreatedCourse{
    loading:boolean,
    course: ICourse|null,
    error?:string
}

export enum ECreateCourseActionType{
    CREATE_COURSE_REQUEST="CREATE_COURSE_REQUEST",
    CREATE_COURSE_SUCCESS="CREATE_COURSE_SUCCESS",
    CREATE_COURSE_FAILURE="CREATE_COURSE_FAILURE",
    CREATE_COURSE="CREATE_COURSE",
}

export enum EGetTechersActionType{
    GET_TEACHERS_REQUEST="GET_TEACHERS_REQUEST",
    GET_TEACHERS_SUCCESS="GET_TEACHERS_SUCCESS",
    GET_TEACHERS_FAILURE="GET_TEACHERS_FAILURE",
    GET_TEACHERS="GET_TEACHERS",
}

export interface IteachersState{
    loading:boolean,
    teachers:any[],
    error?:string
}

export interface IteachersAction{
    type:EGetTechersActionType,
    payload:any
}