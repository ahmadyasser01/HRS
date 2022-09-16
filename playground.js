var current_timestamp = new Date();
current_timestamp = current_timestamp.toLocaleString('en-US', {
    timeZone: 'Africa/Cairo',

  })
console.log(current_timestamp);
let date = new Date(Date.parse(current_timestamp))
console.log(date);  

