const express = require("express");
const { getData } = require("../controllers/dataController");
const router = express.Router();

/*
@method: GET
@ path:http://localhost:5000/
private
*/

router.get("/", getData);

module.exports = router;
