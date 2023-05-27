const express = require("express");
const router = express.Router();
const stories = require("../services/stories");

/* GET stories. */
router.get("/", async function (req, res) {
	try {
		res.json(await stories.getMultiple(req.query.page));
	} catch (err) {
		console.error(`Error while getting stories `, err.message);
	}
});

/*GET story*/
router.get("/:id", async function (req, res) {
	try {
		res.json(await stories.getOne(req.params.id));
	} catch (err) {
		console.error(`Error while getting stories `, err.message);
	}
});

/* POST story */
router.post("/", async function (req, res) {
	console.log(req.body);
	try {
		res.json(await stories.create(req.body));
	} catch (err) {
		console.error(`Error while creating stories`, err.message);
	}
});

/* PUT programming language */
router.put("/:id", async function (req, res, next) {
	try {
		res.json(await stories.update(req.params.id, req.body));
	} catch (err) {
		console.error(`Error while updating story`, err.message);
		next(err);
	}
});

router.delete("/:id", async function (req, res, next) {
	try {
		res.json(await stories.remove(req.params.id));
	} catch (err) {
		console.error(`Error while deleting story`, err.message);
		next(err);
	}
});

module.exports = router;
