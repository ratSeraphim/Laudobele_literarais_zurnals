const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT title FROM stories LIMIT ${offset},${config.listPerPage}`
	);
	const data = helper.emptyOrRows(rows);
	const meta = { page };

	return {
		data,
		meta,
	};
}

async function create(stories) {
	const result = await db.query(
		`INSERT INTO stories 
      (username, email, password) 
      VALUES 
      ("${stories.username}", "${stories.email}", "${stories.password}");`
	);
	//const createdid = await db.query(
	//	`SELECT story_id FROM stories WHERE username = "${stories.username}"`
	//);
	//console.log({ createdid } + " is the created id");
	//const inforesult = await db.query(
	//	`INSERT INTO userinfo (story_id, display_name) VALUES (${createdid}, "${stories.displayname}`
	//);

	let message = "Error in creating story";

	if (result.affectedRows) {
		//if (inforesult.affectedRows) {
		message = "story created successfully";
		//}
	}

	return { message };
}

async function update(id, stories) {
	const result = await db.query(
		`UPDATE stories
      SET username="${stories.username}", released_year=${stories.password}, githut_rank=${stories.email}
      WHERE id=${id}`
	);

	let message = "Error in updating story";

	if (result.affectedRows) {
		message = "story updated successfully";
	}

	return { message };
}

async function remove(id) {
	const result = await db.query(`DELETE FROM stories WHERE id=${id}`);

	let message = "Error in deleting story";

	if (result.affectedRows) {
		message = "story deleted successfully";
	}

	return { message };
}

module.exports = {
	getMultiple,
	create,
	update,
	remove,
};
