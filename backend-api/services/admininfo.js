const db = require("./db");

async function getUserStats() {
	const rows = await db.query(` call userStatistics();`);
	const data = rows[0];

	return data;
}

async function getStatistics() {
	const rows = await db.query(` call siteStatistics();`);
	const data = {
		users: rows[0][0],
		stories: rows[1][0],
		comments: rows[2][0],
		collections: rows[3][0],
		posts: rows[4][0],
	};

	return data;
}

module.exports = {
	getStatistics,
	getUserStats,
};
