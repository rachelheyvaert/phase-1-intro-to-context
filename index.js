// Your code here
const createEmployeeRecord = (recArray) => {
  return {
    firstName: recArray[0],
    familyName: recArray[1],
    title: recArray[2],
    payPerHour: recArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};
const createEmployeeRecords = (recordsArray) => {
  return recordsArray.map((rec) => createEmployeeRecord(rec));
};
const createTimeInEvent = function (dateStamp) {
  // const [date, hour] = dateStamp.split(" ")
  const arrFromDate = dateStamp.split(" ");
  const date = arrFromDate[0];
  const hour = arrFromDate[1];
  const inEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  };
  this.timeInEvents.push(inEvent);
  return this;
};

const createTimeOutEvent = function (dateStamp) {
  // const [date, hour] = dateStamp.split(" ")
  const arrFromDate = dateStamp.split(" ");
  const date = arrFromDate[0];
  const hour = arrFromDate[1];
  const outEvent = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  };
  this.timeOutEvents.push(outEvent);
  return this;
};

const hoursWorkedOnDate = function (targetDate) {
  const inEvent = this.timeInEvents.find(
    (inEvent) => inEvent.date === targetDate
  );
  const outEvent = this.timeOutEvents.find(
    (outEvent) => outEvent.date === targetDate
  );
  return (outEvent.hour - inEvent.hour) / 100;
};
const wagesEarnedOnDate = function (targetDate) {
  return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour;
};
//creating a card for each employee containing the following content
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  );
  return payable;
};

const findEmployeeFirstName = function (srcArray, firstName) {
  return srcArray.find((rec) => rec.firstName === firstName);
};

const calculatePayroll = function (recsArray) {
  return recsArray.reduce((total, rec) => {
    return total + allWagesFor.call(rec);
  });
};
