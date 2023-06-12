const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const {
	encryptPassword,
	generateSalt,
	comparePasswords,
} = require("../encrypt");
const { generateJWT } = require("./verify");

async function getMultiple(page) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT accounts.account_id, display_name 
		FROM accounts
		INNER JOIN userinfo 
		ON accounts.account_id = userinfo.account_id 
		LIMIT ${offset},${config.listPerPage}`
	);
	const pageCount = await db.query(
		`	SELECT CEIL(COUNT(account_id)/6) AS page_count FROM accounts LIMIT 1;`
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
		`SELECT role, display_email, display_name, description, accounts.account_id AS account_id
		FROM accounts 
		INNER JOIN userinfo 
		ON accounts.account_id = userinfo.account_id 
		WHERE accounts.account_id=?`,
		[id]
	);
	const data = rows[0];

	return data;
}

async function getCreations(id) {
	const rows = await db.query(`CALL accountCreations(?);`, [id]);
	const data = {
		stories: rows[0],
		collections: rows[1],
		posts: rows[2],
		comments: rows[3],
	};

	return data;
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
	let message, JWT;
	//Sameklē datus, kurus lietotājs ievadījis, salīdzinot ar datubāzi
	const rows = await db.query(
		`SELECT password, salt, role, accounts.account_id, display_name
		FROM accounts INNER JOIN userinfo ON accounts.account_id = userinfo.account_id
		WHERE (username=?) OR (email=?)`,
		[accounts.name, accounts.name] //"Escape variables"
	);

	if (rows[0]) {
		//Lietotāja ievadīto paroli šifrē ar vienādo salt vērtību, lai droši salīdzinātu paroles
		if (comparePasswords(accounts.password, rows[0].password, rows[0].salt)) {
			//JWT saglabātās vērtības
			const payload = {
				id: rows[0].account_id,
				displayName: rows[0].display_name,
				role: rows[0].role,
			};
			//Ievieto vērtības
			JWT = generateJWT(payload, "1d");
			message = "Login successful";
		} else {
			//Ja parole nesakrīt
			message = "E-mail/Username or Password incorrect";
		}
	} else {
		//Ja ievadītais lietotājvārds/e-pasts nav atrasts
		message = "E-mail/Username or Password incorrect";
	}
	//Atgriež lietotājam datus
	return { message, JWT };
}

async function update(id, accounts) {
	let description;
	let display_email;
	if (accounts.display_email === undefined || !accounts.display_email) {
		display_email = null;
	} else {
		display_email = accounts.display_email;
	}
	if (accounts.description === undefined || !accounts.description) {
		description = null;
	} else {
		description = accounts.description;
	}
	const result = await db.query(
		`UPDATE userinfo
      SET display_email=?, description=?
      WHERE account_id=?`,
		[display_email, description, id]
	);

	let message = "Error in updating account";

	if (result.affectedRows) {
		message = "Account updated successfully";
	}

	return message;
}

async function remove(id) {
	const result = await db.query(`DELETE FROM accounts WHERE account_id=?`, [
		id,
	]);

	let message = "Error in deleting account";

	if (result.affectedRows) {
		message = "Account deleted successfully";
	}

	return message;
}

module.exports = {
	getMultiple,
	getOne,
	create,
	update,
	remove,
	login,
	getCreations,
};
