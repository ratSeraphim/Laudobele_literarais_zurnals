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

async function create(accounts) {
	const result = await db.query(
		`INSERT INTO accounts 
      (username, email, password) 
      VALUES 
      ("${accounts.username}", "${accounts.email}", "${accounts.password}");`
	);
	//const createdid = await db.query(
	//	`SELECT account_id FROM accounts WHERE username = "${accounts.username}"`
	//);
	//console.log({ createdid } + " is the created id");
	//const inforesult = await db.query(
	//	`INSERT INTO userinfo (account_id, display_name) VALUES (${createdid}, "${accounts.displayname}`
	//);

	let message = "Error in creating account";

	if (result.affectedRows) {
		//if (inforesult.affectedRows) {
		message = "Account created successfully";
		//}
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
