/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/day.ts":
/*!********************!*\
  !*** ./src/day.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Day: () => (/* binding */ Day),\n/* harmony export */   toDayID: () => (/* binding */ toDayID)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ \"./src/main.ts\");\n\nvar Day = /** @class */ (function () {\n    function Day(id, hobbyTime, studyTime) {\n        this.id = id;\n        this.hobbyTime = hobbyTime;\n        this.studyTime = studyTime;\n    }\n    Day.prototype.completion = function (type) {\n        var timeSpent = (type == \"study\" ? this.studyTime : this.hobbyTime);\n        var minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60));\n        var hours = Math.floor((timeSpent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));\n        return Math.floor(minutes / 30) * 1 + hours * 2;\n    };\n    Day.fromDate = function (date) {\n        return new Day(toDayID(date), 0, 0);\n    };\n    Day.fromObject = function (obj) {\n        return new Day(obj.id, obj.hobbyTime, obj.studyTime);\n    };\n    return Day;\n}());\n\nfunction toDayID(date) {\n    var id = \"\".concat(date.getFullYear()).slice(2) + (0,_main__WEBPACK_IMPORTED_MODULE_0__.leftpadLowNumber)(date.getMonth(), \"0\") + (0,_main__WEBPACK_IMPORTED_MODULE_0__.leftpadLowNumber)(date.getDate(), \"0\");\n    return \"\".concat(id);\n}\n\n\n//# sourceURL=webpack://hobbytracker/./src/day.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   leftpadLowNumber: () => (/* binding */ leftpadLowNumber)\n/* harmony export */ });\n/* harmony import */ var _day__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./day */ \"./src/day.ts\");\n/* harmony import */ var _month__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./month */ \"./src/month.ts\");\n\n\nvar timer = document.querySelector(\"#timer\");\nvar timerControl = document.querySelector(\"#timerControl\");\nvar calendar = document.querySelector(\"#calendar\");\nvar studyTitle = document.querySelector(\"#studytitle\");\nvar hobbyTitle = document.querySelector(\"#hobbytitle\");\nvar monthDisplay = document.querySelector(\"#currentmonth\");\nvar yearDisplay = document.querySelector(\"#currentyear\");\nvar prevMonthButton = document.querySelector(\"#prevmonth\");\nvar nextMonthButton = document.querySelector(\"#nextmonth\");\nvar shortGoalDisplay = document.querySelector(\"#shortgoal\");\nvar longGoalDisplay = document.querySelector(\"#longgoal\");\nvar importButton = document.querySelector(\"#import\");\nvar exportButton = document.querySelector(\"#export\");\nvar resetButton = document.querySelector(\"#reset\");\nvar importExportArea = document.querySelector(\"#jsoninput\");\nvar statsDisplay = document.querySelector(\"#statsDisplay\");\nvar mainContent = document.querySelector(\"#maincontent\");\nvar statsContainer = document.querySelector(\"#stats\");\nvar statsTitle = document.querySelector(\"#statstitle\");\n//stats\nvar score = 0;\nvar daysStudied = 0;\nvar daysHobbied = 0;\nvar hrsStudied = 0;\nvar minsStudied = 0;\nvar secsStudied = 0;\nvar hrsHobbied = 0;\nvar minsHobbied = 0;\nvar secsHobbied = 0;\nvar timerRunning = false;\nvar focusedDate = new Date();\nvar studymode = false;\n//in case of tab becoming inactive\nvar stoppedTime = new Date(0, 0, 0);\nvar timerInterval;\nvar data;\nvar currentMonth;\nvar Today;\nfunction loadSave(sourceJSON) {\n    data = [];\n    var newdata = JSON.parse(sourceJSON);\n    var now = new Date();\n    newdata.forEach(function (oldmonth) {\n        var newdays = [];\n        oldmonth.days.forEach(function (day) {\n            newdays.push(_day__WEBPACK_IMPORTED_MODULE_0__.Day.fromObject(day));\n        });\n        var newMonth = _month__WEBPACK_IMPORTED_MODULE_1__.Month.fromComponents(oldmonth.id, newdays);\n        data.push(newMonth);\n        currentMonth = newMonth;\n    });\n    var day = currentMonth.getDay(now);\n    if (day == null) {\n        day = _day__WEBPACK_IMPORTED_MODULE_0__.Day.fromDate(now);\n        currentMonth.days.push(day);\n    }\n    Today = day;\n    updateCalendar();\n}\nfunction resetSave() {\n    console.log(JSON.stringify(data));\n    var now = new Date();\n    data = [];\n    currentMonth = _month__WEBPACK_IMPORTED_MODULE_1__.Month.fromDate(now);\n    data.push(currentMonth);\n    Today = _day__WEBPACK_IMPORTED_MODULE_0__.Day.fromDate(now);\n    getMonth(now).days.push(Today);\n    localStorage.setItem(\"hobbyTrackerSave\", JSON.stringify(data));\n    updateCalendar();\n}\nif (localStorage.getItem(\"hobbyTrackerSave\") == null) {\n    resetSave();\n}\nelse {\n    loadSave(localStorage.getItem(\"hobbyTrackerSave\"));\n}\nfunction getMonth(date) {\n    var monthid = (0,_month__WEBPACK_IMPORTED_MODULE_1__.toMonthID)(date);\n    var monthObj = null;\n    data.forEach(function (month) {\n        if (month.id == monthid)\n            monthObj = month;\n    });\n    return monthObj;\n}\nfunction daysInMonth(month, year) {\n    return new Date(year, month + 1, 0).getDate();\n}\nfunction leftpadLowNumber(input, padstr) {\n    return input < 10 ? \"\".concat(padstr).concat(input) : input;\n}\nfunction loadCalendar() {\n    var monthObj = getMonth(focusedDate);\n    var days = daysInMonth(focusedDate.getMonth(), focusedDate.getFullYear());\n    for (var i = 1; i <= days; i++) {\n        var day = document.createElement(\"div\");\n        day.classList.add(\"day\");\n        day.textContent = \"\".concat(leftpadLowNumber(i, \" \"));\n        calendar.appendChild(day);\n        if (monthObj == null)\n            continue;\n        var dayObj = monthObj.getDay(new Date(focusedDate.getFullYear(), focusedDate.getMonth(), i));\n        if (dayObj == null)\n            continue;\n        colorDay(day, dayObj);\n    }\n    var dummy = document.createElement(\"div\");\n    dummy.classList.add(\"dummyday\");\n    dummy.textContent = \" \";\n    calendar.appendChild(dummy);\n}\nfunction colorDay(dayElement, dayObj) {\n    var completion = dayObj.completion(studymode ? \"study\" : \"hobby\");\n    dayElement.classList.remove(\"bg-darkred\", \"bg-darkgreen\", \"bg-lightred\", \"bg-lightgreen\");\n    if (completion > 0)\n        dayElement.classList.add(\"\".concat(studymode ? \"bg-darkred\" : \"bg-darkgreen\"));\n    if (completion > 1)\n        dayElement.classList.add(\"\".concat(studymode ? \"bg-lightred\" : \"bg-lightgreen\"));\n    if (dayObj.id == Today.id)\n        dayElement.classList.add(\"border-blue\");\n}\nfunction updateCalendar() {\n    updateCalendarHeader();\n    calendar.textContent = \"\";\n    loadCalendar();\n}\nfunction updateCalendarHeader() {\n    var month = focusedDate.toLocaleString('en', { month: 'long' });\n    var year = focusedDate.getFullYear();\n    monthDisplay.textContent = \"\".concat(month);\n    yearDisplay.textContent = \"\".concat(year);\n}\nfunction updateTimer(increment) {\n    if (increment === void 0) { increment = true; }\n    if (increment && timerRunning) {\n        if (studymode)\n            Today.studyTime += 1000;\n        else\n            Today.hobbyTime += 1000;\n        localStorage.setItem(\"hobbyTrackerSave\", JSON.stringify(data));\n    }\n    var timeSpent = studymode ? Today.studyTime : Today.hobbyTime;\n    var hours = Math.floor((timeSpent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));\n    var minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60));\n    var seconds = Math.floor((timeSpent % (1000 * 60)) / 1000);\n    timer.textContent = \"\".concat(hours, \":\").concat(leftpadLowNumber(minutes, \"0\"), \":\").concat(leftpadLowNumber(seconds, \"0\"));\n    if (minutes < 30)\n        timer.classList.remove(\"fg-darkred\", \"fg-darkgreen\", \"fg-lightred\", \"fg-lightgreen\");\n    if (minutes >= 30)\n        timer.classList.add(\"\".concat(studymode ? \"fg-darkred\" : \"fg-darkgreen\"));\n    else if (hours >= 1)\n        timer.classList.add(\"\".concat(studymode ? \"fg-lightred\" : \"fg-lightgreen\"));\n    if (timerRunning && minutes % 30 == 0 && seconds == 0)\n        updateCalendar();\n}\nfunction switchToStudy() {\n    if (timerRunning)\n        return;\n    mainContent.classList.remove(\"hidden\");\n    statsContainer.classList.add(\"hidden\");\n    studymode = true;\n    shortGoalDisplay.classList.remove(\"fg-darkgreen\");\n    longGoalDisplay.classList.remove(\"fg-lightgreen\");\n    shortGoalDisplay.classList.add(\"fg-darkred\");\n    longGoalDisplay.classList.add(\"fg-lightred\");\n    hobbyTitle.classList.add(\"notbold\");\n    statsTitle.classList.add(\"notbold\");\n    studyTitle.classList.remove(\"notbold\");\n    updateTimer(false);\n    updateCalendar();\n}\nfunction switchToHobby() {\n    if (timerRunning)\n        return;\n    mainContent.classList.remove(\"hidden\");\n    statsContainer.classList.add(\"hidden\");\n    studymode = false;\n    shortGoalDisplay.classList.add(\"fg-darkgreen\");\n    longGoalDisplay.classList.add(\"fg-lightgreen\");\n    shortGoalDisplay.classList.remove(\"fg-darkred\");\n    longGoalDisplay.classList.remove(\"fg-lightred\");\n    studyTitle.classList.add(\"notbold\");\n    statsTitle.classList.add(\"notbold\");\n    hobbyTitle.classList.remove(\"notbold\");\n    updateTimer(false);\n    updateCalendar();\n}\nfunction calculateStats() {\n    var hobbyTimeSum = 0;\n    var studyTimeSum = 0;\n    data.forEach(function (month) {\n        month.days.forEach(function (day) {\n            hobbyTimeSum += day.hobbyTime;\n            studyTimeSum += day.studyTime;\n            var hobbyCompletion = day.completion(\"hobby\");\n            if (hobbyCompletion > 0) {\n                score++;\n                daysHobbied++;\n            }\n            if (hobbyCompletion > 1)\n                score++;\n            var studyCompletion = day.completion(\"study\");\n            if (studyCompletion > 0) {\n                score++;\n                daysStudied++;\n            }\n            if (studyCompletion > 1)\n                score++;\n        });\n    });\n    hrsStudied = Math.floor((studyTimeSum % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));\n    minsStudied = Math.floor((studyTimeSum % (1000 * 60 * 60)) / (1000 * 60));\n    secsStudied = Math.floor((studyTimeSum % (1000 * 60)) / 1000);\n    hrsHobbied = Math.floor((hobbyTimeSum % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));\n    minsHobbied = Math.floor((hobbyTimeSum % (1000 * 60 * 60)) / (1000 * 60));\n    secsHobbied = Math.floor((hobbyTimeSum % (1000 * 60)) / 1000);\n}\nfunction switchToStats() {\n    if (timerRunning)\n        return;\n    calculateStats();\n    mainContent.classList.add(\"hidden\");\n    statsContainer.classList.remove(\"hidden\");\n    studyTitle.classList.add(\"notbold\");\n    hobbyTitle.classList.add(\"notbold\");\n    statsTitle.classList.remove(\"notbold\");\n    statsDisplay.innerHTML = \"  Score: \".concat(score, \"<br>\\n                                    Completed days: hobby: \").concat(daysHobbied, \" | study: \").concat(daysStudied, \"<br>\\n                                    Time spent on hobbies: \").concat(hrsHobbied, \" hrs, \").concat(minsHobbied, \" mins, \").concat(secsHobbied, \" secs<br>\\n                                    Time spent on studying: \").concat(hrsStudied, \" hrs, \").concat(minsStudied, \" mins, \").concat(secsStudied, \" secs\");\n}\nfunction resetCalendarView() {\n    focusedDate = new Date();\n    updateCalendar();\n}\nfunction focusPrevMonth() {\n    if (timerRunning)\n        return;\n    var year = focusedDate.getFullYear();\n    var month = focusedDate.getMonth();\n    focusedDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, 1);\n    updateCalendar();\n}\nfunction focusNextMonth() {\n    if (timerRunning)\n        return;\n    var year = focusedDate.getFullYear();\n    var month = focusedDate.getMonth();\n    focusedDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, 1);\n    updateCalendar();\n}\ntimerControl.addEventListener(\"click\", function (e) {\n    if (timerRunning) {\n        //stop timer\n        timerRunning = false;\n        timerControl.textContent = \"Start\";\n        localStorage.setItem(\"hobbyTrackerSave\", JSON.stringify(data));\n        clearInterval(timerInterval);\n    }\n    else {\n        //start timer\n        resetCalendarView();\n        timerRunning = true;\n        timerControl.textContent = \"Stop\";\n        timerInterval = setInterval(updateTimer, 1000);\n    }\n});\nhobbyTitle.addEventListener(\"click\", switchToHobby);\nstudyTitle.addEventListener(\"click\", switchToStudy);\nstatsTitle.addEventListener(\"click\", switchToStats);\nexportButton.addEventListener(\"click\", function (e) {\n    if (timerRunning)\n        return;\n    importExportArea.value = JSON.stringify(data);\n    localStorage.setItem(\"hobbyTrackerSave\", JSON.stringify(data));\n    resetCalendarView();\n});\nimportButton.addEventListener(\"click\", function (e) {\n    if (timerRunning)\n        return;\n    if (importExportArea.value == \"\")\n        return;\n    console.log(JSON.stringify(data));\n    loadSave(importExportArea.value);\n    localStorage.setItem(\"hobbyTrackerSave\", JSON.stringify(data));\n    resetCalendarView();\n});\nresetButton.addEventListener(\"click\", function (e) {\n    if (timerRunning)\n        return;\n    resetSave();\n    resetCalendarView();\n});\nprevMonthButton.addEventListener(\"click\", focusPrevMonth);\nnextMonthButton.addEventListener(\"click\", focusNextMonth);\nupdateCalendar();\ndocument.addEventListener(\"visibilitychange\", function () {\n    if (!timerRunning)\n        return;\n    if (document.hidden) {\n        //stopping timer\n        stoppedTime = new Date();\n        clearInterval(timerInterval);\n    }\n    else {\n        //updating and restarting timer\n        var now = new Date();\n        var timeDiff = now.getMilliseconds() - stoppedTime.getMilliseconds();\n        if (studymode)\n            Today.studyTime += timeDiff;\n        else\n            Today.hobbyTime += timeDiff;\n        stoppedTime = new Date(0, 0, 0);\n        timerInterval = setInterval(updateTimer, 1000);\n    }\n});\n\n\n//# sourceURL=webpack://hobbytracker/./src/main.ts?");

/***/ }),

/***/ "./src/month.ts":
/*!**********************!*\
  !*** ./src/month.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Month: () => (/* binding */ Month),\n/* harmony export */   toMonthID: () => (/* binding */ toMonthID)\n/* harmony export */ });\n/* harmony import */ var _day__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./day */ \"./src/day.ts\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ \"./src/main.ts\");\n\n\nvar Month = /** @class */ (function () {\n    function Month(id, days) {\n        this.id = id;\n        this.days = days;\n    }\n    Month.prototype.getDay = function (date) {\n        var dayid = (0,_day__WEBPACK_IMPORTED_MODULE_0__.toDayID)(date);\n        var dayObj = null;\n        this.days.forEach(function (day) {\n            if (day.id == dayid)\n                dayObj = day;\n        });\n        return dayObj;\n    };\n    Month.fromDate = function (date) {\n        return new Month(toMonthID(date), []);\n    };\n    Month.fromObject = function (obj) {\n        return new Month(obj.id, obj.days);\n    };\n    Month.fromComponents = function (id, days) {\n        return new Month(id, days);\n    };\n    return Month;\n}());\n\nfunction toMonthID(date) {\n    var id = \"\".concat(date.getFullYear()).slice(2) + (0,_main__WEBPACK_IMPORTED_MODULE_1__.leftpadLowNumber)(date.getMonth(), \"0\");\n    return \"\".concat(id);\n}\n\n\n//# sourceURL=webpack://hobbytracker/./src/month.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;