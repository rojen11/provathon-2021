const moment = require("moment");

function getDateTime() {
    let dt = moment();
    return dt.format("dddd MMMM YYYY LTS");
}



function dateTimeinDBFormat() { 
    let dateformat = moment().utc(true);
    return dateformat.format()
}

module.exports = {getDateTime , dateTimeinDBFormat} 
