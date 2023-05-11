const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT title, story_id, summary, display_name FROM stories INNER JOIN userinfo ON stories.account_id = userinfo.account_id WHERE public=1 ORDER BY stories.date DESC LIMIT ${offset},${config.listPerPage}`
	);
	const data = helper.emptyOrRows(rows);
	const meta = { page };

	return {
		data,
		meta,
	};
}

async function getOne(id, stories) {
	const rows = await db.query(
		`SELECT title, story_id, summary, display_name, date, content 
		FROM stories 
		INNER JOIN userinfo 
		ON stories.account_id = userinfo.account_id 
		WHERE story_id=${id}`
	);
	const data = rows[0];

	return {
		data,
	};
}

async function create(stories) {
	const result = await db.query(
		`INSERT INTO stories 
      (username, email, password) 
      VALUES 
      ("${stories.username}", "${stories.email}", "${stories.password}");`
	);

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
      SET summary="${stories.summary}", date=${stories.password}, content=${stories.email}
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
	getOne,
	getMultiple,
	create,
	update,
	remove,
};
