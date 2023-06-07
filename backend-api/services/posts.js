const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT post_id, content, date, story_id, collection_id, display_name, userinfo.account_id AS account_id 
		FROM posts 
		INNER JOIN userinfo 
		ON userinfo.account_id = posts.account_id 
		ORDER BY date DESC LIMIT ${offset},${config.listPerPage}`
	);
	const pageCount = await db.query(
		`	SELECT CEIL(COUNT(post_id)/6) AS page_count FROM posts LIMIT 1;`
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
	const rows = await db.query(
		`SELECT title, post_id, summary, display_name, date, content, userinfo.account_id AS account_id 
		FROM posts 
		INNER JOIN userinfo 
		ON posts.account_id = userinfo.account_id 
		WHERE post_id=?`,
		[id]
	);
	const data = rows[0];

	return data;
}

async function create(posts) {
	const result = await db.query(
		`INSERT INTO posts 
      (account_id, content, story_id, collection_id) 
      VALUES 
      (?, ?, ?, ?) ;`,
		[posts.account_id, posts.content, posts.story, posts.collection]
	);

	let message = "Error in creating post";

	if (result.affectedRows) {
		message = "Post created successfully";
	}

	return message;
}

async function remove(id) {
	const result = await db.query(`DELETE FROM posts WHERE post_id=?`, [id]);

	let message = "Error in deleting post";

	if (result.affectedRows) {
		message = "Post deleted successfully";
	}

	return message;
}

module.exports = {
	getOne,
	getMultiple,
	create,

	remove,
};
