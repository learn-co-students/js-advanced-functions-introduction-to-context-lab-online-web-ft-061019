// Your code here
function createEmployeeRecord(record){
    return{
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(recordArray){
    return recordArray.map(record => createEmployeeRecord(record))

}

function findEmployeeByFirstName(employeeRecords, name){
    return employeeRecords.find(function(employee){
        return employee.firstName == name
    })
}

function createTimeInEvent(employeeRecord, timeStamp){
    let date = timeStamp.split(' ');
    employeeRecord.timeInEvents.push({type: 'TimeIn', hour: parseInt(date[1]),
    date: date[0] });

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeStamp){
    let date = timeStamp.split(' ');
    employeeRecord.timeOutEvents.push({type: 'TimeOut', hour: parseInt(date[1]),
    date: date[0] });

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, workRecord){
    let timeIn = employeeRecord.timeInEvents.find(function(record){
        return record.date = workRecord
    })
    let timeOut = employeeRecord.timeOutEvents.find(function(record){
        return record.date = workRecord
    })
    let hoursWorked =  (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, workRecord){
    let hours = hoursWorkedOnDate(employeeRecord, workRecord)
    return hours * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    let dates = employeeRecord.timeInEvents.map(function(record){
        return record.date
    })

    let wages = dates.reduce(function(totalWages, date){
        return totalWages + wagesEarnedOnDate(employeeRecord, date)
    }, 0)

    return wages
}

let calculatePayroll = function(employeeRecords){
    return employeeRecords.reduce(function(totalWorked, employeeRecord){
        return totalWorked + allWagesFor(employeeRecord)}, 0)
}

