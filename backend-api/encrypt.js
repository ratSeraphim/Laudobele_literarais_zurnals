const crypto = require("crypto");

function generateSalt(length = 16) {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString("hex")
		.slice(0, length);
}

function encryptPassword(password, salt) {
	const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");
	return hash;
}

function comparePasswords(inputPassword, storedPassword, salt) {
	const inputPasswordHash = crypto
		.createHmac("sha256", salt)
		.update(inputPassword)
		.digest("hex");

	return inputPasswordHash === storedPassword;
}

module.exports = {
	encryptPassword,
	comparePasswords,
	generateSalt,
};
