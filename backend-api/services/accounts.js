const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const {
	encryptPassword,
	generateSalt,
	comparePasswords,
} = require("../encrypt");
const { generateJWT } = require("./verify");

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

// creating an account begins //
async function create(accounts) {
	const salt = generateSalt();
	const hashedPassword = encryptPassword(accounts.password, salt);
	console.log("first create phase ...");
	const account = await db.query(
		`INSERT INTO accounts 
      (username, email, password, salt) 
      VALUES 
      (?, ?, ?, ?);`,
		[accounts.username, accounts.email, hashedPassword, salt]
		//  parameterise your query ^^^
	);

	let message = "Error in creating account";

	if (account.affectedRows) {
		message = grabId(accounts);
	}
	return message;
}
async function grabId(accounts) {
	const createdid = await db.query(
		`SELECT account_id FROM accounts WHERE username = ?`,
		[accounts.username]
	);

	const userid = createdid[0];
	let message = "Error in creating account";
	console.log(userid.account_id + " is the created id");
	if (userid.account_id) {
		message = createUser(userid.account_id, accounts);
	}
	return message;
}

async function createUser(id, accounts) {
	console.log("entered second create phase ");
	const user = await db.query(
		`INSERT INTO userinfo (account_id, display_name) VALUES (?, ?);`,
		[id, accounts.displayname]
	);
	let message = "Error in creating account";
	if (user.affectedRows) {
		message = "Account created successfully";
	}
	return message;
}
//creating account ends

async function login(accounts) {
	console.log(accounts);
	const rows = await db.query(
		`SELECT password, salt, role, accounts.account_id, display_name
		FROM accounts INNER JOIN userinfo ON accounts.account_id = userinfo.account_id
		WHERE (username=?) OR (email=?)`,
		[accounts.name, accounts.name]
	);

	if (rows[0]) {
		if (comparePasswords(accounts.password, rows[0].password, rows[0].salt)) {
			const payload = {
				id: rows[0].account_id,
				displayName: rows[0].display_name,
				role: rows[0].role,
			};
			JWT = generateJWT(payload, "1d");

			message = "Login successful";
		} else {
			JWT = undefined;
			message = "E-mail/Username or Password incorrect";
		}
	} else {
		JWT = undefined;
		message = "E-mail/Username or Password incorrect";
	}
	return { message, JWT };
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
	login,
};
