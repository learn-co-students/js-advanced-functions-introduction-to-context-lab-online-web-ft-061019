// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []

    }
}
let createEmployeeRecords = (sourceArray) =>{
    return sourceArray.map(attribute => {
        return createEmployeeRecord(attribute)
    })
}

let createTimeInEvent = (emyployeeObj, timeIn) => {
    let [date, hour] = timeIn.split(' ')
    
    emyployeeObj.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    })
    return emyployeeObj
}

let createTimeOutEvent = (emyployeeObj, timeOut) => {
    let [date, hour] = timeOut.split(' ')
    
    emyployeeObj.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    })
    return emyployeeObj
}

let hoursWorkedOnDate = (emyployeeObj, hours) => {
   let shiftStart = emyployeeObj.timeInEvents.find( employee => {
        return employee.date === hours
    })
    let shiftEnd = emyployeeObj.timeOutEvents.find( employee => {
        return employee.date === hours
    })

    return (shiftEnd.hour - shiftStart.hour) / 100
}

let wagesEarnedOnDate = (emyployeeObj, hours) => {
    let pay = hoursWorkedOnDate(emyployeeObj, hours) * emyployeeObj.payPerHour
    return pay
} 

let allWagesFor = emyployeeObj => {
    let payableDates = emyployeeObj.timeInEvents.map( employee =>{
        return employee.date
    })
    let payableHours = payableDates.reduce((payStub, dat) => {
        return payStub + wagesEarnedOnDate(emyployeeObj, dat)
    }, 0)
    return payableHours
}

let calculatePayroll = sourceEmployeeArray => {
    return sourceEmployeeArray.reduce( (paystub, receipt) => {
        return paystub + allWagesFor(receipt)
    }, 0 )
}

let findEmployeeByFirstName = ((sourceArray, firstName) => {
    return sourceArray.find(receipt => {
        return receipt.firstName === firstName
    })
})


