const express = require("express");
const app = express();
const port = process.env.port || 3001;
const accountsRouter = require("./routes/accounts");
const storiesRouter = require("./routes/stories");
const postsRouter = require("./routes/posts");
const collectionsRouter = require("./routes/collections");
const commentsRouter = require("./routes/comments");
const admininfoRouter = require("./routes/admininfo");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.FRONTEND_URL, // Update with your frontend URL
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
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
app.use("/collections", collectionsRouter);
app.use("/comments", commentsRouter);
app.use("/admin", admininfoRouter);
/* Error handler middleware */

app.get("/setcookie", (red, res) => {
	res.cookie(`Cookie name`, `Cookie string`);
	res.send(`Cookie saved successfully`);
});
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
});
app.listen(port, () => {
	console.log(`server started on port ${port}`);
});
