
export const convertTime = (momentObj)=>{
    let dateTime = new Date(momentObj);
    dateTime = dateTime.toLocaleString('en-US', {
      timeZone: 'Africa/Cairo',
    })
    return dateTime;
}