// Your code here
function createEmployeeRecord(array) {
    return { 
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, timePunch) {
    let [date, hour] = timePunch.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function createTimeOutEvent(employee, timePunch) {
    let [date, hour] = timePunch.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function hoursWorkedOnDate(employee, date) {
    let inTime = employee.timeInEvents.find(function(event){
        return event.date === date
    })

    let outTime = employee.timeOutEvents.find(function(event){
        return event.date === date
    })

    return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    let wage = hoursWorkedOnDate(employee, date)
        * employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee) {
    let payDates = employee.timeInEvents.map(function(event){
        return event.date
    })

    let payable = payDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function calculatePayroll(arrayOfRecords) {
    return arrayOfRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(function(rec){
        return rec.firstName === firstName
      })
}
