import { leftpadLowNumber } from "./main"
export class Day {
    id:string
    hobbyTime : number
    studyTime : number
    constructor(id:string, hobbyTime: number, studyTime: number) {
        this.id = id
        this.hobbyTime = hobbyTime
        this.studyTime = studyTime
    }
    completion(type : "study"|"hobby") : number {
        let timeSpent = (type == "study" ? this.studyTime : this.hobbyTime)
        var minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60))
        var hours = Math.floor((timeSpent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        return Math.floor(minutes / 30) * 1 + hours*2
    }

    static fromDate(date:Date) {
        return new Day(toDayID(date),0,0)
    }

    static fromObject(obj : Day){
        return new Day(obj.id,obj.hobbyTime,obj.studyTime)
    }
}

export function toDayID(date:Date){
    let id = `${date.getFullYear()}`.slice(2) + leftpadLowNumber(date.getMonth(),"0") + leftpadLowNumber(date.getDate(), "0")
    return `${id}`
}