const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT name, description, collection_id FROM collections
        LIMIT ${offset},${config.listPerPage}`
	);
	const pageCount = await db.query(
		`	SELECT CEIL(COUNT(collection_id)/6) AS page_count FROM collections LIMIT 1;`
	);
	const totalPages = pageCount[0];
	const data = helper.emptyOrRows(rows);
	const meta = { page, totalPages };

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

async function getUsers(id) {
	const rows = await db.query(
		`SELECT display_name, account_id 
		FROM userinfo 
		WHERE account_id NOT IN(SELECT account_id FROM account_collection WHERE collection_id =?)`,
		[id]
	);
	const data = rows;

	return data;
}

async function getStories(id) {
	const rows = await db.query(
		`SELECT title, story_id 
		FROM stories 
		WHERE story_id NOT IN(SELECT story_id FROM story_collection WHERE collection_id = ?) AND public=true;`,
		[id]
	);
	const data = rows;

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

async function addStory(collections) {
	const result = await db.query(
		`INSERT INTO story_collection 
      (story_id, collection_id) 
      VALUES 
      (?, ?);`,
		[collections.story_id, collections.collection_id]
	);

	let message = "Error in creating collection";

	if (result.affectedRows) {
		message = "Story added successfully";
	}

	return message;
}

async function addUser(collections) {
	const result = await db.query(
		`INSERT INTO account_collection 
      (account_id, collection_id) 
      VALUES 
      (?, ?);`,
		[collections.account_id, collections.collection_id]
	);

	let message = "Error in creating collection";

	if (result.affectedRows) {
		message = "Story added successfully";
	}

	return message;
}

async function update(id, collections) {
	const result = await db.query(
		`UPDATE collections
      SET description=?
      WHERE collection_id=?`,
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

async function removeUser(identifier) {
	console.log(identifier);
	const result = await db.query(
		`DELETE FROM account_collection WHERE account_id=? AND collection_id=?`,
		[identifier.item_id, identifier.id]
	);

	let message = "Error in removing user from collection";

	if (result.affectedRows) {
		message = "User removed successfully";
	}

	return message;
}
async function removeStory(identifier) {
	const result = await db.query(
		`DELETE FROM story_collection WHERE story_id=? AND collection_id=?`,
		[identifier.item_id, identifier.id]
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
	getUsers,
	getStories,
	create,
	addUser,
	addStory,
	update,
	remove,
	removeUser,
	removeStory,
};
