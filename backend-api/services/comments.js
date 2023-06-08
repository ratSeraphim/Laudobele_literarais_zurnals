const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getStoryComms(id, page) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT comment_id, content, display_name, story_id, date, userinfo.account_id
        FROM comments
        INNER JOIN userinfo ON comments.account_id = userinfo.account_id
        WHERE story_id = ? ORDER BY date DESC LIMIT ${offset},${config.listPerPage}`,
		[id]
	);
	const pageCount = await db.query(
		`	SELECT CEIL(COUNT(comment_id)/6) AS page_count FROM comments INNER JOIN stories ON stories.story_id = comments.story_id WHERE stories.story_id = ? LIMIT 1`,
		[id]
	);

	const totalPages = pageCount[0];
	const data = helper.emptyOrRows(rows);
	const meta = { page, totalPages };

	return {
		data,
		meta,
	};
}

async function getComms(id) {
	const rows = await db.query(
		`SELECT comment_id, stories.title, comments.content, comments.date, comments.account_id
		FROM comments 
		INNER JOIN stories ON stories.story_id = comments.story_id
		WHERE comments.account_id=?`,
		[id]
	);
	const data = rows[0];

	return data;
}

async function create(id, comments) {
	console.log(comments);
	const result = await db.query(
		`INSERT INTO comments 
      (account_id, content, story_id) 
      VALUES 
      (?, ?, ?)`,
		[comments.account_id, comments.content, id]
	);

	let message = "Error in creating comment";

	if (result.affectedRows) {
		message = "Comment created successfully";
	}

	return message;
}

async function remove(id) {
	const result = await db.query(`DELETE FROM comments WHERE comment_id=?`, [
		id,
	]);

	let message = "Error in deleting comment";

	if (result.affectedRows) {
		message = "Comment deleted successfully";
	}

	return message;
}

module.exports = {
	getStoryComms,
	getComms,
	create,
	remove,
};
