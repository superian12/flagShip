const db = require('../config/db');


module.exports = {
    dailyReportCard:  (ush) => {
        var statement = 'select count(*) as report from parcels where  DAY(dateGenerated) = DAY(curdate()) union all select count(*) from parcels where  DAY(dateDelivered) = DAY(curdate()) union all select SUM(amount) from parcels where DAY(dateGenerated) = DAY(curdate())'
        db.query(statement, function (err, result) {
            if (err)
                ush(err, null);
            else
                ush(null, result);

        });

    },
    dailyMessengerIn: (ush) =>{
        var statement = `select distinct u.firstName, count(p.wayBill) as count from parcels p INNER join  users u ON p.messengerGet = u.userID  WHERE DAY(dateGenerated) = DAY(curdate()) AND MONTH(dateGenerated) = MONTH(curdate()) group by u.firstName `
        
        db.query(statement , (err,result) =>{
            if(err)ush(err,null);
            else ush(null,result);
        });
    },
    dailyMessengerOut: (ush) => {
        var statement = `select distinct u.firstName, count(p.wayBill) as count from parcels p INNER join  users u ON p.messengerPost = u.userID  WHERE DAY(dateDelivered) = DAY(curdate()) AND MONTH(dateDelivered) = MONTH(curdate()) group by u.firstName `
        
        db.query(statement , (err,result) =>{
            if(err)ush(err,null);
            else ush(null,result);
        });

    }
}