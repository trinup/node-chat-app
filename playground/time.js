var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());moment();


var date = moment();
date.add(10, 'year').subtract(9, 'months');
console.log(date.format("MMM Do, YYYY"));
console.log(date.format('h:mm a'));