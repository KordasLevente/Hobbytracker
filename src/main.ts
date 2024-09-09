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
const resetButton = document.querySelector("#reset")
const importExportArea : HTMLTextAreaElement = document.querySelector("#jsoninput")
const statsDisplay = document.querySelector("#statsDisplay")
const mainContent = document.querySelector("#maincontent")
const statsContainer = document.querySelector("#stats")
const statsTitle = document.querySelector("#statstitle")

//stats
let score = 0
let daysStudied = 0
let daysHobbied = 0
let hrsStudied = 0
let minsStudied = 0
let secsStudied = 0
let hrsHobbied = 0
let minsHobbied = 0
let secsHobbied = 0

let timerRunning = false
let focusedDate = new Date()
let studymode = false
//in case of tab becoming inactive
let stoppedTime : Date = new Date(0,0,0)
let timerInterval : ReturnType<typeof setTimeout>

let data :Month[]
let currentMonth : Month
let Today : Day

function loadSave(sourceJSON : string) {
    data = []
    let newdata : Month[] = JSON.parse(sourceJSON)
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
}

function resetSave() {
    console.log(JSON.stringify(data))
    let now = new Date()
    data = []
    currentMonth = Month.fromDate(now)
    data.push(currentMonth)
    Today = Day.fromDate(now)
    getMonth(now).days.push(Today)
    localStorage.setItem("hobbyTrackerSave",JSON.stringify(data))
    updateCalendar()
}

if(localStorage.getItem("hobbyTrackerSave") == null){
    resetSave()
}
else {
    loadSave(localStorage.getItem("hobbyTrackerSave"))
}


function getMonth(date : Date) : Month {
    let monthid = toMonthID(date)
    let monthObj = null
    data.forEach(month => {
        if(month.id == monthid) monthObj = month
    });
    return monthObj
}

function daysInMonth (month:number, year:number) : number {
    return new Date(year, month+1, 0).getDate();
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
        colorDay(day,dayObj)
    }
    let dummy = document.createElement("div")
    dummy.classList.add("dummyday")
    dummy.textContent = " "
    calendar.appendChild(dummy)
}

function colorDay(dayElement :HTMLDivElement, dayObj : Day) {
    let completion = dayObj.completion(studymode ? "study" : "hobby")
    dayElement.classList.remove("bg-darkred", "bg-darkgreen", "bg-lightred", "bg-lightgreen")
    if (completion > 0) dayElement.classList.add(`${studymode ? "bg-darkred" : "bg-darkgreen"}`)
    if (completion > 1) dayElement.classList.add(`${studymode ? "bg-lightred" : "bg-lightgreen"}`)
    if (dayObj.id == Today.id) dayElement.classList.add("border-blue")
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
        localStorage.setItem("hobbyTrackerSave",JSON.stringify(data))
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
    mainContent.classList.remove("hidden")
    statsContainer.classList.add("hidden")
    studymode = true
    shortGoalDisplay.classList.remove("fg-darkgreen")
    longGoalDisplay.classList.remove("fg-lightgreen")
    shortGoalDisplay.classList.add("fg-darkred")
    longGoalDisplay.classList.add("fg-lightred")
    hobbyTitle.classList.add("notbold")
    statsTitle.classList.add("notbold")
    studyTitle.classList.remove("notbold")
    updateTimer(false)
    updateCalendar()
}

function switchToHobby() {
    if(timerRunning) return
    mainContent.classList.remove("hidden")
    statsContainer.classList.add("hidden")
    studymode = false
    shortGoalDisplay.classList.add("fg-darkgreen")
    longGoalDisplay.classList.add("fg-lightgreen")
    shortGoalDisplay.classList.remove("fg-darkred")
    longGoalDisplay.classList.remove("fg-lightred")
    studyTitle.classList.add("notbold")
    statsTitle.classList.add("notbold")
    hobbyTitle.classList.remove("notbold")
    updateTimer(false)
    updateCalendar()
}

function calculateStats() {
    let hobbyTimeSum = 0
    let studyTimeSum = 0
    data.forEach(month => {
        month.days.forEach(day => {
            hobbyTimeSum += day.hobbyTime
            studyTimeSum += day.studyTime
            let hobbyCompletion = day.completion("hobby")
            if( hobbyCompletion > 0){
                score++
                daysHobbied++
            }
            if(hobbyCompletion > 1) score++

            let studyCompletion = day.completion("study")
            if( studyCompletion > 0){
                score++
                daysStudied++
            }
            if(studyCompletion > 1) score++

        })
    });

    hrsStudied = Math.floor((studyTimeSum % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minsStudied = Math.floor((studyTimeSum % (1000 * 60 * 60)) / (1000 * 60))
    secsStudied = Math.floor((studyTimeSum % (1000 * 60)) / 1000)
    hrsHobbied = Math.floor((hobbyTimeSum % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minsHobbied = Math.floor((hobbyTimeSum % (1000 * 60 * 60)) / (1000 * 60))
    secsHobbied = Math.floor((hobbyTimeSum % (1000 * 60)) / 1000)
}

function switchToStats() {
    if(timerRunning) return
    calculateStats()
    mainContent.classList.add("hidden")
    statsContainer.classList.remove("hidden")
    studyTitle.classList.add("notbold")
    hobbyTitle.classList.add("notbold")
    statsTitle.classList.remove("notbold")

    statsDisplay.innerHTML = `  Score: ${score}<br>
                                    Completed days: hobby: ${daysHobbied} | study: ${daysStudied}<br>
                                    Time spent on hobbies: ${hrsHobbied} hrs, ${minsHobbied} mins, ${secsHobbied} secs<br>
                                    Time spent on studying: ${hrsStudied} hrs, ${minsStudied} mins, ${secsStudied} secs`
}

function resetCalendarView() {
    focusedDate = new Date()
    updateCalendar()
}

function focusPrevMonth(){
    if(timerRunning) return
    let year = focusedDate.getFullYear()
    let month = focusedDate.getMonth()
    focusedDate = new Date(month -1 < 0 ? year-1 : year, month-1 < 0 ? 11 : month-1, 1)
    updateCalendar()  
}

function focusNextMonth(){
    if(timerRunning) return
    let year = focusedDate.getFullYear()
    let month = focusedDate.getMonth()
    focusedDate = new Date(month +1 > 11 ? year+1 : year, month+1 > 11 ? 0 : month+1, 1)
    updateCalendar()
}


timerControl.addEventListener("click", (e) =>{
    if(timerRunning){
        //stop timer
        timerRunning = false
        timerControl.textContent = "Start"
        localStorage.setItem("hobbyTrackerSave",JSON.stringify(data))
        clearInterval(timerInterval)
    }
    else {
        //start timer
        resetCalendarView()
        timerRunning = true
        timerControl.textContent = "Stop"
        timerInterval = setInterval(updateTimer, 1000)

    }
})

hobbyTitle.addEventListener("click", switchToHobby)
studyTitle.addEventListener("click", switchToStudy)
statsTitle.addEventListener("click", switchToStats)
exportButton.addEventListener("click", (e) => {
    if(timerRunning) return
    importExportArea.value = JSON.stringify(data)
    localStorage.setItem("hobbyTrackerSave",JSON.stringify(data))
    resetCalendarView()
})

importButton.addEventListener("click", (e) => {
    if(timerRunning) return
    if (importExportArea.value == "") return
    console.log(JSON.stringify(data))
    loadSave(importExportArea.value)
    localStorage.setItem("hobbyTrackerSave",JSON.stringify(data))
    resetCalendarView()
})

resetButton.addEventListener("click", (e) => {
    if(timerRunning) return
    resetSave()
    resetCalendarView()
})

prevMonthButton.addEventListener("click", focusPrevMonth)
nextMonthButton.addEventListener("click", focusNextMonth)


updateCalendar()

document.addEventListener("visibilitychange", () => {
    if(!timerRunning) return
    if(document.hidden) {
        //stopping timer
        stoppedTime = new Date()
        clearInterval(timerInterval)
    }
    else {
        //updating and restarting timer
        let now = new Date()
        let timeDiff : number = now.getMilliseconds() - stoppedTime.getMilliseconds()
        if(studymode) Today.studyTime += timeDiff
        else Today.hobbyTime += timeDiff
        stoppedTime = new Date(0,0,0)
        timerInterval = setInterval(updateTimer, 1000)
    }
})