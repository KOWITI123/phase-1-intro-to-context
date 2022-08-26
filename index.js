// Your code here
const createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
const createEmployeeRecords = function(arr) {
    return arr.map(data => {
        return createEmployeeRecord(data)
    })
}


const createTimeInEvent = function (employee, time) {
    let[date, hour] = time.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}


const createTimeOutEvent = function(employee, time){
    let[date, hour] = time.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

const hoursWorkedOnDate = function(employee, date) {
    let timeIn = employee.timeInEvents.find(time => time.date === date)
    let timeOut = employee.timeOutEvents.find(time => time.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}


const wagesEarnedOnDate = function(employee, date) {
    let rawWage = hoursWorkedOnDate(employee, date)
    * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}


const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(data => data.firstName === firstName)
}


const calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}