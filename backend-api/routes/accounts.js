const express = require("express");
const router = express.Router();
const accounts = require("../services/accounts");
const { verifyJWT } = require("../services/verify");

/* VERIFY the JWT holder */
router.get("/verify", async function (req, res) {
	try {
		res.json(await verifyJWT(req.headers.authorization));
	} catch (err) {
		console.error(`Error while getting accounts `, err.message);
	}
});

/* GET accounts. */
router.get("/", async function (req, res) {
	try {
		res.json(await accounts.getMultiple(req.query.page));
	} catch (err) {
		console.error(`Error while getting accounts `, err.message);
	}
});

/* POST account */
router.post("/", async function (req, res) {
	console.log(req.body);
	try {
		res.json(await accounts.create(req.body));
	} catch (err) {
		res.json({ message: err.message });
		console.error(`Error while creating accounts`, err.message);
	}
});

router.get("/login", async function (req, res) {
	try {
		const response = await accounts.login(req.query.inputs);
		if (response) {
			console.log(response);
			if (response.JWT != undefined) {
				res.cookie("jwt", response.JWT, {
					httpOnly: false,
				});
			}
			res.json(response.message);
		}
	} catch (err) {
		console.error(`Error while updating account`, err.message);
	}
});

/* PUT (update) account */
router.put("/:id", async function (req, res, next) {
	try {
		res.json(await accounts.update(req.params.id, req.body));
	} catch (err) {
		console.error(`Error while updating account`, err.message);
		next(err);
	}
});

router.delete("/:id", async function (req, res, next) {
	try {
		res.json(await accounts.remove(req.params.id));
	} catch (err) {
		console.error(`Error while deleting account`, err.message);
		next(err);
	}
});

module.exports = router;
