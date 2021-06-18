import { INavAction, NavConst } from './../types/navbarTypes';
import { INavState } from "../types/navbarTypes"

export enum EThemeActionTypes{
    CHANGE_THEME="CHANGE_THEME"
}
export interface IThemeState{
    dark:boolean
}
const themeReducer =(state:IThemeState={dark:false},action:{type:EThemeActionTypes}):IThemeState=>{
    switch(action.type){
        case(EThemeActionTypes.CHANGE_THEME):{

            return {dark:!state.dark}

        }
        default:return state
    }
}

export default themeReducer