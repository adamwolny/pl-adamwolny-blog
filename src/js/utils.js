export function convertDate(date){
    var temp = new Date(date);
    var day = temp.getDay();
    var month = temp.getMonth() + 1;

    if (day.toString().length === 1) {
        day = '0' + day;
    }
    if (month.toString().length === 1) {
        month = '0' + month;
    }

    return `${day}.${month}.${temp.getFullYear()}`;
}

export function getDateDays(days){
    var date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0]; // "2016-06-08"
}
