import { Day, toDayID } from "./day"
import { Month, toMonthID } from "./month"

const timer = document.querySelector("#timer")
const timerControl = document.querySelector("#timerControl")
const calendar = document.querySelector("#calendar")
const studyTitle = document.querySelector("#studytitle")
const hobbyTitle = document.querySelector("#hobbytitle")
const monthDisplay = document.querySelector("#currentmonth")
const yearDisplay = document.querySelector("#currentyear")
const prevMonthButton = document.querySelector("#prevmonth")
const nextMonthButton = document.querySelector("#nextmonth")
const shortGoalDisplay = document.querySelector("#shortgoal")
const longGoalDisplay = document.querySelector("#longgoal")
const importButton = document.querySelector("#import")
const exportButton = document.querySelector("#export")
const errorText = document.querySelector("#jsoninputerror")
const importExportArea : HTMLTextAreaElement = document.querySelector("#jsoninput")


let timerRunning = false
let focusedDate = new Date()
let studymode = false

let data : Month[] = []
let currentMonth : Month = Month.fromDate(focusedDate)
data.push(currentMonth)
let Today = Day.fromDate(focusedDate)
getMonth(focusedDate).days.push(Today) 

function getMonth(date : Date) : Month {
    let monthid = toMonthID(date)
    let monthObj = null
    data.forEach(month => {
        if(month.id == monthid) monthObj = month
    });
    return monthObj
}

function daysInMonth (month:number, year:number) : number {
    return new Date(year, month, 0).getDate();
}

export function leftpadLowNumber(input:number, padstr : string) {
    return input < 10 ? `${padstr}${input}` : input
}


function loadCalendar() {
    let monthObj : Month = getMonth(focusedDate)
    let days = daysInMonth(focusedDate.getMonth(), focusedDate.getFullYear())
    for(let i = 1; i <= days; i++){
        let day = document.createElement("div")
        day.classList.add("day")
        day.textContent = `${leftpadLowNumber(i, " ")}`
        calendar.appendChild(day)
        
        if(monthObj == null) continue
        let dayObj = monthObj.getDay(new Date(focusedDate.getFullYear(), focusedDate.getMonth(),i))
        if(dayObj == null) continue
        let completion = dayObj.completion(studymode ? "study" : "hobby")
        if (completion > 0) day.classList.add(`${studymode ? "bg-darkred" : "bg-darkgreen"}`)
        if (completion > 1) day.classList.add(`${studymode ? "bg-lightred" : "bg-lightgreen"}`)
    }
}

function updateCalendar() {
    updateCalendarHeader()
    calendar.textContent = ""
    loadCalendar()
}

function updateCalendarHeader() {
    let month : string = focusedDate.toLocaleString('en', { month: 'long' });
    let year = focusedDate.getFullYear();
    monthDisplay.textContent = `${month}`
    yearDisplay.textContent = `${year}`
}   

function updateTimer(increment = true) {
    if(increment && timerRunning) {
        if(studymode) Today.studyTime += 1000
        else Today.hobbyTime += 1000
    }
    
    let timeSpent = studymode ? Today.studyTime : Today.hobbyTime
    var hours = Math.floor((timeSpent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((timeSpent % (1000 * 60)) / 1000)
    timer.textContent = `${hours}:${leftpadLowNumber(minutes,"0")}:${leftpadLowNumber(seconds,"0")}`
    if(minutes < 30) timer.classList.remove("fg-darkred", "fg-darkgreen", "fg-lightred", "fg-lightgreen")
    if(minutes >= 30) timer.classList.add(`${studymode ? "fg-darkred" : "fg-darkgreen"}`)
    else if(hours >= 1) timer.classList.add(`${studymode ? "fg-lightred" : "fg-lightgreen"}`)
    if (timerRunning && minutes %30 == 0 && seconds == 0) updateCalendar()
}



function switchToStudy() {
    if(timerRunning) return
    studymode = true
    shortGoalDisplay.classList.remove("fg-darkgreen")
    longGoalDisplay.classList.remove("fg-lightgreen")
    shortGoalDisplay.classList.add("fg-darkred")
    longGoalDisplay.classList.add("fg-lightred")
    studyTitle.classList.remove("notbold")
    hobbyTitle.classList.add("notbold")
    updateTimer(false)
}

function switchToHobby() {
    if(timerRunning) return
    studymode = false
    shortGoalDisplay.classList.add("fg-darkgreen")
    longGoalDisplay.classList.add("fg-lightgreen")
    shortGoalDisplay.classList.remove("fg-darkred")
    longGoalDisplay.classList.remove("fg-lightred")
    studyTitle.classList.add("notbold")
    hobbyTitle.classList.remove("notbold")
    updateTimer(false)
}

timerControl.addEventListener("click", (e) =>{
    if(timerRunning){
        //stop timer
        timerRunning = false
        timerControl.textContent = "Start"
    }
    else {
        //start timer
        timerRunning = true
        timerControl.textContent = "Stop"

    }
})

hobbyTitle.addEventListener("click", switchToHobby)
studyTitle.addEventListener("click", switchToStudy)

exportButton.addEventListener("click", (e) => {
    importExportArea.value = JSON.stringify(data)
})

importButton.addEventListener("click", (e) => {
    data = []
    let newdata : Month[] = JSON.parse(importExportArea.value)
    let now = new Date()
    newdata.forEach(oldmonth => {
        let newdays:Day[] = []
        oldmonth.days.forEach(day => {
            newdays.push(Day.fromObject(day))
        });
        let newMonth = Month.fromComponents(oldmonth.id, newdays)
        data.push(newMonth)
        currentMonth = newMonth
    });
    let day = currentMonth.getDay(now)
    if(day == null) {
        day = Day.fromDate(now)
        currentMonth.days.push(day)
    }
    Today = day

    updateCalendar()
})

updateCalendar()
setInterval(updateTimer,1000)