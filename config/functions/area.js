const db = require('./../db');

module.exports = {
    getActiveArea: (ush) => {
        const statement = "select areaID, areaName,type FROM areas where inService = 1";
        db.query(statement, (err, result) => {
            if (err) ush(err, null);
            ush(null, result);
        })
    }
}