const express = require("express");
const router = express.Router();
const admininfo = require("../services/admininfo");

router.get("/stats", async function (req, res) {
	try {
		res.json(await admininfo.getStatistics());
	} catch (err) {
		console.error(`Error while getting stats `, err.message);
	}
});

router.get("/stats/users", async function (req, res) {
	try {
		res.json(await admininfo.getUserStats());
	} catch (err) {
		console.error(`Error while getting stats `, err.message);
	}
});

module.exports = router;
