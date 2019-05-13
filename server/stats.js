const moment = require ('moment');
let now = moment();
let addS = (stats, req) => {
    //console.log(req.body.quantity);
    req.body.time = now.format('MMMM DD YYYY, h:mm:ss');
    stats.push (req.body);
    return JSON.stringify (stats, null, 4);
};
module.exports = {
    addS
};