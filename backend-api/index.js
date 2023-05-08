const express = require("express");
const app = express();
const port = 3001;
const accountsRouter = require("./routes/accounts");
const storiesRouter = require("./routes/stories");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.get("/", (req, res) => {
	res.json({ message: "ok" });
});
app.use("/accounts", accountsRouter);
app.use("/stories", storiesRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
});
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
