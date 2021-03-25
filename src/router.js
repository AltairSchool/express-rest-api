var express = require('express');
var router = express.Router();
var usersController = require('./controllers/user-controller');
var personsController = require('./controllers/person-controller');

router.use("/user", usersController);  
router.use("/person", personsController);  

router.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});


module.exports = router;