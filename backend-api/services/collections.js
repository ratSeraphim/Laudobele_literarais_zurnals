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
	};

	return {
		data,
	};
}

async function create(collections) {
	const result = await db.query(
		`INSERT INTO collections 
      (title, content, summary, account_id, public) 
      VALUES 
      (?, ?, ?, ?, ?);`,
		[
			collections.title,
			collections.content,
			collections.summary,
			collections.account_id,
			collections.public,
		]
	);

	let message = "Error in creating collection";

	if (result.affectedRows) {
		message = "collection created successfully";
	}

	return message;
}

async function update(id, collections) {
	const result = await db.query(
		`UPDATE collections
      SET summary="${collections.summary}", date=${collections.password}, content=${collections.email}
      WHERE id=${id}`
	);

	let message = "Error in updating collection";

	if (result.affectedRows) {
		message = "collection updated successfully";
	}

	return message;
}

async function remove(id) {
	const result = await db.query(`DELETE FROM collections WHERE id=${id}`);

	let message = "Error in deleting collection";

	if (result.affectedRows) {
		message = "collection deleted successfully";
	}

	return { message };
}

module.exports = {
	getOne,
	getMultiple,
	create,
	update,
	remove,
};
