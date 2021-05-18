import { INavAction, NavConst } from './../types/navbarTypes';
import { INavState } from "../types/navbarTypes"

const navbarReducer =(state:INavState={open:true},action:INavAction):INavState=>{
    switch(action.type){
        case(NavConst.CHANGE_NAVBAR):
            return {open:!state.open}
        default:return state
    }
}

export default navbarReducer