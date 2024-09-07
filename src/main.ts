
const timer = document.querySelector("#timer")
const timerControl = document.querySelector("#timerControl")
const calendar = document.querySelector("#calendar")
let timerRunning = false
let timeSpent = 0

function daysInMonth (month:number, year:number) : number {
    return new Date(year, month, 0).getDate();
}

function formatTimerOutput(input:number) {
    return input < 10 ? `0${input}` : input
}

function setup() {
    let now = new Date()
    loadCalendar(now.getMonth(), now.getFullYear())
}

function loadCalendar(month:number, year:number) {
    let days = daysInMonth(month, year)
    for(let i = 1; i <= days; i++){
        let day = document.createElement("div")
        day.classList.add("day")
        day.textContent = `${i}`
        calendar.appendChild(day)
    }
}

function updateTimer() {
    if(!timerRunning) return
    timeSpent += 1000
    var hours = Math.floor((timeSpent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((timeSpent % (1000 * 60)) / 1000)
    timer.textContent = `${hours}:${formatTimerOutput(minutes)}:${formatTimerOutput(seconds)}`
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
setup()
setInterval(updateTimer,1000)