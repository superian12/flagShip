module.exports={
    getVendor: function (ush) {
        var statement = 'SELECT * FROM VENDORS where status = 1';
        db.query(statement, (err, result) => {
            if (err) ush(err, null);
            else ush(null, result);
        })
    }
}