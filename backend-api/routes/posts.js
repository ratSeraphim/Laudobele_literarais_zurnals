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

/* POST post */
router.post("/", async function (req, res) {
	console.log(req.body);
	try {
		res.json(await posts.create(req.body));
	} catch (err) {
		console.error(`Error while creating posts`, err.message);
	}
});

router.delete("/:id", async function (req, res, next) {
	try {
		res.json(await posts.remove(req.params.id));
	} catch (err) {
		console.error(`Error while deleting post`, err.message);
		next(err);
	}
});

module.exports = router;
