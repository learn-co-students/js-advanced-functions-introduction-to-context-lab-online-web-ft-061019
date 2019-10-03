// Your code here
function createEmployeeRecord(erArray) {
    const [firstName, familyName, title, payRate] = erArray
    return {
        firstName: firstName,
        familyName: familyName, 
        title: title,
        payPerHour: payRate, 
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(erArray) {
    return erArray.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateT) {
    let [date, hour] = dateT.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour), 
        date,
    })
    return employee
}

function createTimeOutEvent(employee, dateT) {
    let [date, hour] = dateT.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour), 
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, dateWorked){
    let timeInEvent = employee.timeInEvents.find(function(event){
        return event.date === dateWorked
    })
    let timeOutEvent = employee.timeOutEvents.find(function(event){
        return event.date === dateWorked
    })

    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateWorked){
    let wagesEarned = hoursWorkedOnDate(employee, dateWorked) * employee.payPerHour
    return parseFloat(wagesEarned.toString())
}

let allWagesFor = function(employee){
    let workedDates = employee.timeInEvents.map(function(event){
        return event.date
    })
    let cashMoney = workedDates.reduce(function(wages, value){
        return wages + wagesEarnedOnDate(employee, value)
    }, 0)
    return cashMoney
}

function findEmployeeByFirstName(employeesArray, firstName){
    return employeesArray.find(employeeName => employeeName.firstName === firstName)
}

let calculatePayroll = function(employeesArray){
    return employeesArray.reduce(function(wages, value){
        return wages + allWagesFor(value)
    }, 0)
}