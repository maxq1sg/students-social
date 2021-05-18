export interface INavAction{
    type:string,
}
export interface INavState{
    open:boolean
}
export enum NavConst{
    CHANGE_NAVBAR="CHANGE_NAVBAR"
}