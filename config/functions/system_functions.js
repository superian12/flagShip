const db = require('./../db');


module.exports = {
    getDetails: function () {
        var x = "Woke F"

        return ("1");
    },
    getName: function () {
        return "IAN";
    },
    getlast: function () {

    },
    deliverParcel: function (wayBill,status,recipient) {
        let sql = `UPDATE parcels set dateDelivered = NOW(), recipient = ${recipient} ,status= ${status} WHERE wayBill = '${wayBill}' `;
        let query = db.query(sql, (err, result) => {
            if (err) return err;
            else console.log("Executed");
        })
    }
    // END OF module exports
}