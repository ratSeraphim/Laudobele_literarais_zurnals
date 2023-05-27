const express = require("express");
const router = express.Router();
const comments = require("../services/comments");

/* GET comments. */
router.get("/story/:id", async function (req, res) {
	try {
		res.json(await comments.getStoryComms(req.params.id, req.query.page));
	} catch (err) {
		console.error(`Error while getting comments `, err.message);
	}
});

router.get("/:id", async function (req, res) {
	try {
		res.json(await comments.getComms(req.params.id));
	} catch (err) {
		console.error(`Error while getting comments `, err.message);
	}
});

/* Create comment */
router.post("/:id", async function (req, res) {
	console.log(req.body);
	try {
		res.json(await comments.create(req.params.id, req.body));
	} catch (err) {
		console.error(`Error while creating comments`, err.message);
	}
});

router.delete("/:id", async function (req, res, next) {
	try {
		res.json(await comments.remove(req.params.id));
	} catch (err) {
		console.error(`Error while deleting comment`, err.message);
		next(err);
	}
});

module.exports = router;
