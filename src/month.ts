import { Day, toDayID } from "./day"
import { leftpadLowNumber } from "./main"

export class Month {
    id : string
    days : Day[]

    constructor(id:string,days:Day[]) {
        this.id = id
        this.days = days
    }

    getDay(date : Date) : Day {
        let dayid = toDayID(date)
        let dayObj = null
        this.days.forEach(day => {
            if(day.id == dayid) dayObj = day
        });
        return dayObj
    }

    static fromDate(date:Date) {
        return new Month(toMonthID(date),[])
    }
    static fromObject(obj:Month) {
        return new Month(obj.id,obj.days)
    }

    static fromComponents(id:string, days:Day[]) {
        return new Month(id,days)
    }
}

export function toMonthID(date:Date){
    let id = `${date.getFullYear()}`.slice(2) + leftpadLowNumber(date.getMonth(),"0")
    return `${id}`
}