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
    deliverParcel: function (wayBill,status) {
        let sql = `UPDATE parcels set dateDelivered = NOW(), status= ${status} WHERE wayBill = '${wayBill}' `;
        let query = db.query(sql, (err, result) => {
            if (err) return err;
            return "executed"
        })
    }
    // END OF module exports
}