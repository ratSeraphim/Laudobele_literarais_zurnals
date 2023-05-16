const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT post_id, content, date, story_id, collection_id, display_name FROM posts INNER JOIN userinfo ON userinfo.account_id = posts.account_id ORDER BY date DESC LIMIT ${offset},${config.listPerPage}`
	);
	const data = helper.emptyOrRows(rows);
	const meta = { page };

	return {
		data,
		meta,
	};
}

async function getOne(id, posts) {
	const rows = await db.query(
		`SELECT title, post_id, summary, display_name, date, content 
		FROM posts 
		INNER JOIN userinfo 
		ON posts.account_id = userinfo.account_id 
		WHERE post_id=${id}`
	);
	const data = rows[0];

	return {
		data,
	};
}

async function create(posts) {
	const result = await db.query(
		`INSERT INTO posts 
      (username, email, password) 
      VALUES 
      ("${posts.username}", "${posts.email}", "${posts.password}");`
	);

	let message = "Error in creating post";

	if (result.affectedRows) {
		//if (inforesult.affectedRows) {
		message = "post created successfully";
		//}
	}

	return { message };
}

async function update(id, posts) {
	const result = await db.query(
		`UPDATE posts
      SET summary="${posts.summary}", date=${posts.password}, content=${posts.email}
      WHERE id=${id}`
	);

	let message = "Error in updating post";

	if (result.affectedRows) {
		message = "post updated successfully";
	}

	return { message };
}

async function remove(id) {
	const result = await db.query(`DELETE FROM posts WHERE id=${id}`);

	let message = "Error in deleting post";

	if (result.affectedRows) {
		message = "post deleted successfully";
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
