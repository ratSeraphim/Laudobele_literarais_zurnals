const express = require("express");
const app = express();
const port = process.env.port || 3001;
const accountsRouter = require("./routes/accounts");
const storiesRouter = require("./routes/stories");
const postsRouter = require("./routes/posts");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000", // Update with your frontend URL
		credentials: true,
	})
);

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
app.use("/posts", postsRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
});
app.listen(port, () => {
	console.log(`server started on port ${port}`);
});
