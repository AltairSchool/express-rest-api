
var express = require('express');
var controller = express.Router();

var db = require("../database.js")


controller.get("/", (req, res, next) => {
    // #swagger.tags = ['Person']
    
    var sql = "select * from person";
    var params = [];
    console.log("person get all:");
    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: rows,
        });
    });
});

controller.get("/:id", (req, res, next) => {
    var sql = "select * from person where id = ?";
    var params = [req.params.id];
    console.log("person get single:", req.params.id);
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: row[0],
        });
    });
});
controller.post("/", (req, res, next) => {
    var errors = [];
    console.log(req.body);
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (!req.body.lastName) {
        errors.push("No lastName specified");
    }

    if (!req.body.email) {
        errors.push("No email specified");
    }

    if (!req.body.birthDay) {
        errors.push("No birthDay specified");
    }

    if (errors.length) {
        res.status(400).json({ error: errors.join(",") });
        return;
    }

    var data = {
        name: req.body.name,
        lastName: req.body.name,
        email: req.body.email,
        birthDay: req.body.birthDay,
        recordDate: new Date()
    };
    var sql = "INSERT INTO person (name, lastName, email, birthDay, recordDate) VALUES (?,?,?,?,?)";
    var params = [data.name, data.lastName, data.email, data.birthDay, data.recordDate];
    db.query(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: data,
            id: this.lastID,
        });
    });
})
controller.patch("/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        lastName: req.body.name,
        email: req.body.email,
        birthDay: req.body.birthDay,
    };
    console.log(req.body);
    db.query(
        `UPDATE person set 
           name = coalesce(?,name), 
           lastName = coalesce(?,lastName), 
           email = COALESCE(?,email), 
           birthDay = coalesce(?,birthDay) 
           WHERE id = ?`,
        [data.name, data.lastName, data.email, data.birthDay, req.params.id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: res.message });
                return;
            }
            res.json({
                message: "success",
                data: data,
            });
        }
    );
})
controller.delete("/:id", (req, res, next) => {
    db.query(
        "DELETE FROM person WHERE id = ?",
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ error: res.message });
                return;
            }
            res.json({ message: "deleted", rows: this.changes });
        }
    );
});

// export default controller;

module.exports = controller;