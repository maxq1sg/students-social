import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme=>({
    table:{
      maxWidth:"800px",
      overflow:"hidden",
    },
    relative:{
      position:"relative",

    },
    absolute:{
      position:"absolute",
      top:"50%",
      left:"50%"
    }
}))


// export const customStyles = {
//   menu:(provided:any, state:any) => ({
//     ...provided,
//     maxHeight:"100px",
//   }),
//   option: (provided:any, state:any) => ({
//     ...provided,
//     borderBottom: '1px dotted pink',
//     color: state.isSelected ? 'red' : 'blue',
//   }),

//   singleValue: (provided:any, state:any) => {
//     const opacity = state.isDisabled ? 0.5 : 1;
//     const transition = 'opacity 300ms';

//     return { ...provided, opacity, transition };
//   }
// }

export default useStyles