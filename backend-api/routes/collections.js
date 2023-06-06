const express = require("express");
const router = express.Router();
const collections = require("../services/collections");

/* GET collections. */
router.get("/", async function (req, res) {
	try {
		res.json(await collections.getMultiple(req.query.page));
	} catch (err) {
		console.error(`Error while getting collections `, err.message);
	}
});

/*GET collection*/
router.get("/:id", async function (req, res) {
	try {
		res.json(await collections.getOne(req.params.id));
	} catch (err) {
		console.error(`Error while getting collections `, err.message);
	}
});

/*GET users NOT in collection*/
router.get("/users/:id", async function (req, res) {
	try {
		res.json(await collections.getUsers(req.params.id));
	} catch (err) {
		console.error(`Error while getting users NOT in collection `, err.message);
	}
});

/*GET stories NOT in collection*/
router.get("/stories/:id", async function (req, res) {
	try {
		res.json(await collections.getStories(req.params.id));
	} catch (err) {
		console.error(
			`Error while getting stories NOT in collection `,
			err.message
		);
	}
});

/* POST collection */
router.post("/", async function (req, res) {
	console.log(req.body);
	try {
		res.json(await collections.create(req.body));
	} catch (err) {
		console.error(`Error while creating collections`, err.message);
	}
});

router.post("/user", async function (req, res) {
	console.log(req.body);
	try {
		res.json(await collections.addUser(req.body));
	} catch (err) {
		console.error(`Error while creating collections`, err.message);
	}
});

router.post("/story", async function (req, res) {
	console.log(req.body);
	try {
		res.json(await collections.addStory(req.body));
	} catch (err) {
		console.error(`Error while creating collections`, err.message);
	}
});

/* PUT collection */
router.put("/:id", async function (req, res, next) {
	try {
		res.json(await collections.update(req.params.id, req.body));
	} catch (err) {
		console.error(`Error while updating collection`, err.message);
		next(err);
	}
});

router.delete("/:id", async function (req, res, next) {
	try {
		res.json(await collections.remove(req.params.id));
	} catch (err) {
		console.error(`Error while deleting collection`, err.message);
		next(err);
	}
});

router.delete("/user/removal", async function (req, res, next) {
	try {
		console.log(req.query);
		res.json(await collections.removeUser(req.query));
	} catch (err) {
		console.error(`Error while removing user from collection`, err.message);
		next(err);
	}
});

router.delete("/story/removal", async function (req, res, next) {
	try {
		res.json(await collections.removeStory(req.query));
	} catch (err) {
		console.error(`Error while removing story from collection`, err.message);
		next(err);
	}
});

module.exports = router;
