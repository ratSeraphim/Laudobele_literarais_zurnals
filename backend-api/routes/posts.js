const express = require("express");
const router = express.Router();
const posts = require("../services/posts");

/* GET posts. */
router.get("/", async function (req, res) {
	try {
		res.json(await posts.getMultiple(req.query.page));
	} catch (err) {
		console.error(`Error while getting posts `, err.message);
	}
});

/*GET post*/
router.get("/:id", async function (req, res) {
	try {
		res.json(await posts.getOne(req.params.id));
	} catch (err) {
		console.error(`Error while getting posts `, err.message);
	}
});

/* POST account */
router.post("/", async function (req, res) {
	console.log(req.body);
	try {
		res.json(await posts.create(req.body));
	} catch (err) {
		console.error(`Error while creating posts`, err.message);
	}
});

/* PUT programming language */
router.put("/:id", async function (req, res, next) {
	try {
		res.json(await posts.update(req.params.id, req.body));
	} catch (err) {
		console.error(`Error while updating account`, err.message);
		next(err);
	}
});

router.delete("/:id", async function (req, res, next) {
	try {
		res.json(await posts.remove(req.params.id));
	} catch (err) {
		console.error(`Error while deleting account`, err.message);
		next(err);
	}
});

module.exports = router;
