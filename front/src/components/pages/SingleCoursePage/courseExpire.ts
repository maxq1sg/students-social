const courseExpire = (date:string):[number,boolean]=>{
    const dateDiffInDays=Math.floor((Date.parse(date)-Date.now())/(1000*60*60*24))
    return [Math.abs(dateDiffInDays),dateDiffInDays<=0]
}

export default courseExpire