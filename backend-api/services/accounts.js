const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT * FROM accounts LIMIT ${offset},${config.listPerPage}`
	);
	const data = helper.emptyOrRows(rows);
	const meta = { page };

	return {
		data,
		meta,
	};
}

//const createdid = await db.query(
//	`SELECT account_id FROM accounts WHERE username = "${accounts.username}"`
//);
//console.log({ createdid } + " is the created id");
//const inforesult = await db.query(
//	`INSERT INTO userinfo (account_id, display_name) VALUES (${createdid}, "${accounts.displayname}`
//);

//("${accounts.username}", "${accounts.email}", "${accounts.password}");

async function create(accounts) {
	console.log("first create phase " + accounts.displayname);
	const account = await db.query(
		`INSERT INTO accounts 
      (username, email, password) 
      VALUES 
      (?, ?, ?);`,
		[accounts.username, accounts.email, accounts.password]
		//  parameterise your query ^^^
	);

	let message = "Error in creating account";

	if (account.affectedRows) {
		grabId(accounts);
	}
}
async function grabId(accounts) {
	const createdid = await db.query(
		`SELECT account_id FROM accounts WHERE username = ?`,
		[accounts.username]
	);

	const userid = createdid[0];

	console.log(userid.account_id + " is the created id");
	if (userid.account_id) {
		createUser(userid.account_id, accounts);
	}
}

async function createUser(id, accounts) {
	console.log("entered second create phase " + accounts.displayname);
	const user = await db.query(
		`INSERT INTO userinfo (account_id, display_name) VALUES (?, ?);`,
		[id, accounts.displayname]
	);
	let message = "Error in creating account";
	if (user.affectedRows) {
		message = "Account created successfully";
	}
	return { message };
}

async function update(id, accounts) {
	const result = await db.query(
		`UPDATE accounts
      SET username="${accounts.username}", released_year=${accounts.password}, githut_rank=${accounts.email}
      WHERE id=${id}`
	);

	let message = "Error in updating account";

	if (result.affectedRows) {
		message = "Account updated successfully";
	}

	return { message };
}

async function remove(id) {
	const result = await db.query(`DELETE FROM accounts WHERE id=${id}`);

	let message = "Error in deleting account";

	if (result.affectedRows) {
		message = "Account deleted successfully";
	}

	return { message };
}

module.exports = {
	getMultiple,
	create,
	update,
	remove,
};
