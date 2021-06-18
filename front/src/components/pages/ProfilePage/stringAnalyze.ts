type TStr= "дру"|"курс"

export default function stringAnalyze(count:number,str:TStr){
    const firstGroup:number[] = [2,3,4]
    const lastDigit=count%10
    if(str==="дру"){
        if(lastDigit==1){
            return `${count} друг`
        } else if(firstGroup.includes(lastDigit)){
            return `${count} друга`
        }
        return `${count} друзей`
    } else if(str==="курс"){
        if(lastDigit==1){
            return `${count} курс`
        } else if(firstGroup.includes(lastDigit)){
            return `${count} курса`
        }
        return `${count} курсов`
    }
}