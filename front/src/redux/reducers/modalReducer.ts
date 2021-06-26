interface IModalState{
    open:boolean,text?:string
}
export enum EModalActions{
    OPEN_MODAL="OPEN_MODAL",
    CLOSE_MODAL="CLOSE_MODAL"
}
const modalReducer =(state:IModalState={open:false},action:{type:EModalActions,payload:string}):IModalState=>{
    switch(action.type){
        case(EModalActions.OPEN_MODAL):
            return {open:true,text:action.payload}
        case(EModalActions.CLOSE_MODAL):
            return {open:false}
        default:return state
    }
}

export default modalReducer