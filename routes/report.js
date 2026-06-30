const express = require("express");
const router = express.Router({mergeParams : true});
const reportController = require("../controller/report");

router.get("/" , reportController.getReports)

module.exports = router;