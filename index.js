// Your code here
function createEmployeeRecord(recordArr) {
    const [firstName, familyName, title, payRate] = recordArr
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payRate,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(nestedEmpArrays) {
    return nestedEmpArrays.map(createEmployeeRecord)
}

function createTimeInEvent(empObj, dateTimeStr) {
    const dtSplit = dateTimeStr.split(" ")
    const dtHourInt = parseInt(dtSplit[1])
    const dtDateStr = dtSplit[0]
    const newTimeInObj = {
       type: "TimeIn",
       hour: dtHourInt,
       date: dtDateStr
    }
    empObj.timeInEvents.push(newTimeInObj)
    return empObj
 }

 function createTimeOutEvent(empObj, dateTimeStr) {
    const dtSplit = dateTimeStr.split(" ")
    const dtHourInt = parseInt(dtSplit[1])
    const dtDateStr = dtSplit[0]
    const newTimeOutObj = {
       type: "TimeOut",
       hour: dtHourInt,
       date: dtDateStr
    }
    empObj.timeOutEvents.push(newTimeOutObj)
    return empObj
 } 

 function hoursWorkedOnDate(empObj, dateStr) {
    const tInEvent = empObj.timeInEvents.find(tiEvent => tiEvent.date === dateStr)
    const tOutEvent = empObj.timeOutEvents.find(toEvent => toEvent.date === dateStr)
 
    const hoursWorked = (tOutEvent.hour - tInEvent.hour) / 100
    return hoursWorked
 }

 function wagesEarnedOnDate(empObj, dateStr) {
    const hoursWorked = hoursWorkedOnDate(empObj, dateStr)
    const payRate = empObj.payPerHour
 
    const payForDate = hoursWorked * payRate
    return payForDate
 }

 function allWagesFor(empObj) {
    const datesInArr = empObj.timeInEvents.map(tiEvent => tiEvent.date)
    const datesOutArr = empObj.timeOutEvents.map(toEvent => toEvent.date)
 
    if (datesInArr.length === datesOutArr.length) {
       //no bad data proceed with wage reduce 
       const wagesArr = datesInArr.map(date => wagesEarnedOnDate(empObj, date))
       const totalWages = wagesArr.reduce((dayWage, value) => value + dayWage, 0)
       return totalWages
    } else {
       console.log("There is bad data for this employee - number of clockin / clockout events mismatch")
       return "Bad Data, check console error"
    }
 }

 function findEmployeeByFirstName(empObjsArr, firstName) {
    return empObjsArr.find(empObj => empObj.firstName === firstName)
 }

 function calculatePayroll(empObjArr) {
    const allEmpWages = empObjArr.map(empObj => allWagesFor(empObj))
    const allEmpWagesTotal = allEmpWages.reduce((empWage, value) => value + empWage, 0)
    return allEmpWagesTotal
 } 