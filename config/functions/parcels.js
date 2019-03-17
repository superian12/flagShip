const db = require('./../db');

module.exports = {
    getcard: function (ush) {
        var statement = 'SELECT SUM(IF(status  = 1, 1, 0)) AS on_site, SUM(IF(status = 2, 1,0)) as on_route, SUM(if(status = 4, 1,0)) as returns FROM parcels'
        db.query(statement, function (err, result) {
            if (err)
                ush(err, null);
            else
                ush(null, result[0]);

        });

    },
    getVendor: function (ush) {
        var statement = 'SELECT * FROM VENDORS where status = 1';
        db.query(statement, (err, result) => {
            if (err) ush(err, null);
            else ush(null, result);
        })
    },
    getActiveParcel:  (ush) => {
        const statement = "select p.wayBill, p.recipient, p.address, a.areaName, p.size ,p.vendorCode, p.status from parcels p INNER JOIN areas a on  a.areaID = p.area WHERE p.status != 3;";
        db.query(statement, (err, result)=>{
            if (err) ush(err, null);
            ush(null, result)
        })
    },
    getExportParcel: (ush)=>{
        const statement = "SELECT wayBill FROM parcels where status IN (1,4)";
        db.query(statement, (err,result)=>{
            if(err) ush(err,null);
            ush(null,result);
        })
    },
    getDeliveryParcel: (ush) =>{
        const statement = "SELECT wayBill FROM parcels where status = 2";
        db.query(statement, (err,result)=>{
            if(err) ush(err,null);
            ush(null,result);
        })
    }
}