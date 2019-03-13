const db = require('./../db');

module.exports = {
    getActiveMessenger: (ush) => {
        const statement = " select  userID,firstName ,lastName from users where roleID = 2"
        db.query(statement, (err, result) => {
            if (err) ush(err, null)
            ush(null, result);
        })
    }
}