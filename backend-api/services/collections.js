const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT name, description, collection_id FROM collections
        LIMIT ${offset},${config.listPerPage}`
	);
	const data = helper.emptyOrRows(rows);
	const meta = { page };

	return {
		data,
		meta,
	};
}

async function getOne(id) {
	const rows = await db.query(`CALL collectionInfo(?);`, [id]);
	const data = {
		stories: rows[0],
		users: rows[1],
		collection: rows[2][0],
	};

	return data;
}

async function create(collections) {
	const result = await db.query(
		`INSERT INTO collections 
      (name, description) 
      VALUES 
      (?, ?);`,
		[collections.name, collections.description]
	);

	let message = "Error in creating collection";

	if (result.affectedRows) {
		message = grabId(collections);
	}

	return message;
}

async function grabId(collections) {
	const createdId = await db.query(
		`SELECT collection_id FROM collections WHERE name = ?`,
		[collections.name]
	);

	const collid = createdId[0];
	let message = "Error in creating collection";
	console.log(collid.collection_id + " is the created id");
	if (collid.collection_id) {
		message = createCollAcc(collid.collection_id, collections);
	}
	return message;
}

async function createCollAcc(id, collections) {
	console.log("entered second create phase ");
	const collAcc = await db.query(
		`INSERT INTO account_collection (account_id, collection_id, role) 
		VALUES (?, ?, ?);`,
		[collections.account_id, id, "owner"]
	);
	let message = "Error in creating collection";
	if (collAcc.affectedRows) {
		message = "Collection created successfully";
	}
	return message;
}

async function update(id, collections) {
	const result = await db.query(
		`UPDATE collections
      SET description=?
      WHERE id=?`,
		[collections.description, id]
	);

	let message = "Error in updating collection";

	if (result.affectedRows) {
		message = "Collection updated successfully";
	}

	return message;
}

async function remove(id) {
	const result = await db.query(`DELETE FROM collections WHERE id=?`, [id]);

	let message = "Error in deleting collection";

	if (result.affectedRows) {
		message = "Collection deleted successfully";
	}

	return message;
}

async function removeUser(id) {
	const result = await db.query(
		`DELETE FROM account_collection WHERE account_id=?`,
		[id]
	);

	let message = "Error in removing user from collection";

	if (result.affectedRows) {
		message = "User removed successfully";
	}

	return message;
}
async function removeStory(id) {
	const result = await db.query(
		`DELETE FROM story_collection WHERE story_id=?`,
		[id]
	);

	let message = "Error in removing story from collection";

	if (result.affectedRows) {
		message = "Story removed successfully";
	}

	return message;
}

module.exports = {
	getOne,
	getMultiple,
	create,
	update,
	remove,
	removeUser,
	removeStory,
};
