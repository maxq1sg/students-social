export interface ITheme{
    primary:string,
    secondary:string,
    main:string,
    text:string,
    border:string,
    shadow:string,
    ava:string,
    avaColor:string,
    colorReverse:string,
    status:string,
    hover:string,
    green:string,
    red:string,
    input:string
}

export const lightTheme:ITheme = {
    primary: '#e5e5e5',
    secondary:"#fff",
    text: '#0d3670',
    main:"#0d3670",
    border:"",
    shadow:"0 0 5px black",
    ava:"purple",
    avaColor:"#fafafa",
    colorReverse:"#222",
    status:"#0d3670",
    hover: "#eee",
    green:"rgb(32, 227, 61)",
    red:"rgb(255, 66, 48)",
    input:"#fff"
}
export const darkTheme:ITheme = {
    primary: '#363537',
    secondary:"#555",
    text: '#FAFAFA',
    main:"#0d3670",
    border:"",
    shadow:"0 0 5px white",
    ava:"#eee",
    avaColor:"#222",
    colorReverse:"#fafafa",
    status:"#ddd",
    hover:"#333",
    green:"rgb(32, 227, 61)",
    red:"rgb(255, 66, 48)",
    input:"#333"
}
export interface Theme{
    body:string,
    text:string,
    background:string
}