const jwt = require("jsonwebtoken");
const secret =
	"tM5c3tkyE^r&4vrLtm&s78w1__0bvj3894jssJF,r435hsH5HJ3mgfdhcNNgb59864jweJN59&55h@#HGGGlaa1@$gggdfgbvcDFDGDgdfgd";

// Verify JWT
const verifyJWT = (token) => {
	try {
		console.log("decoding...");
		const decoded = jwt.verify(token, secret);
		return decoded; // The decoded payload
	} catch (error) {
		// JWT verification failed
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
