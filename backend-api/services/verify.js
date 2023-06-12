const jwt = require("jsonwebtoken");
const secret =
	"tM5c3tkyE^r&4vrLtm&s78w1__0bvj3894jssJF,r435hsH5HJ3mgfdhcNNgb59864jweJN59&55h@#HGGGlaa1@$gggdfgbvcDFDGDgdfgd";

// Verificē lietotāja JWT
const verifyJWT = (token) => {
	try {
		//Mēģina atkodēt saņemto JWT
		console.log("decoding...");
		const decoded = jwt.verify(token, secret);
		//Atgriež atkodēto informmāciju
		return decoded;
	} catch (error) {
		// JWT verifikācija neizdevās
		console.log("failed.");
		return null;
	}
};

const generateJWT = (payload, expiresIn) => {
	return jwt.sign(payload, secret, { expiresIn });
};

module.exports = {
	verifyJWT,
	generateJWT,
};
