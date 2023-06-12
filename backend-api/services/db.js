const mysql = require("mysql2/promise");
const config = require("../config");

//Izveido savienojuma kopu
const pool = mysql.createPool(config.db);

async function query(sql, params) {
	const connection = await pool.getConnection();
	try {
		const [results] = await connection.query(sql, params);
		return results;
	} finally {
		connection.release(); // Atgriež savienojumu
	}
}

module.exports = {
	query,
};
