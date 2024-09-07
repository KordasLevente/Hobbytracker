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

let timerRunning = false
let timeSpent = 0
let focusedDay = new Date()
let studymode = false

function daysInMonth (month:number, year:number) : number {
    return new Date(year, month, 0).getDate();
}

function leftpadLowNumber(input:number, padstr : string) {
    return input < 10 ? `${padstr}${input}` : input
}

function loadCalendar() {
    let days = daysInMonth(focusedDay.getMonth(), focusedDay.getFullYear())
    for(let i = 1; i <= days; i++){
        //diferent colours based on studymode
        let day = document.createElement("div")
        day.classList.add("day")
        day.textContent = `${leftpadLowNumber(i, " ")}`
        calendar.appendChild(day)
    }
}

function updateCalendar() {
    updateCalendarHeader()
    calendar.textContent = ""
    loadCalendar()
}

function updateCalendarHeader() {
    let month : string = focusedDay.toLocaleString('en', { month: 'long' });
    let year = focusedDay.getFullYear();
    monthDisplay.textContent = `${month}`
    yearDisplay.textContent = `${year}`
}   

function updateTimer() {
    if(!timerRunning) return
    timeSpent += 10
    var hours = Math.floor((timeSpent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((timeSpent % (1000 * 60)) / 1000)
    timer.textContent = `${hours}:${leftpadLowNumber(minutes,"0")}:${leftpadLowNumber(seconds,"0")}`
}



function switchToStudy() {
    studymode = true
    shortGoalDisplay.classList.remove("fg-darkgreen")
    longGoalDisplay.classList.remove("fg-lightgreen")
    shortGoalDisplay.classList.add("fg-darkred")
    longGoalDisplay.classList.add("fg-lightred")
    studyTitle.classList.remove("notbold")
    hobbyTitle.classList.add("notbold")
}

function switchToHobby() {
    studymode = false
    shortGoalDisplay.classList.add("fg-darkgreen")
    longGoalDisplay.classList.add("fg-lightgreen")
    shortGoalDisplay.classList.remove("fg-darkred")
    longGoalDisplay.classList.remove("fg-lightred")
    studyTitle.classList.add("notbold")
    hobbyTitle.classList.remove("notbold")
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
updateCalendar()
setInterval(updateTimer,10)