import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import sockets from "socket.io";

const port = 20201;
const production = process.env.NODE_ENV === "production";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const parseForm = bodyParser.urlencoded({ extended: false });
app.use("/", parseForm);

app.set("port", port);

const server = app.listen(app.get("port"), () => {
	console.log(
		`Express running → on PORT ${server.address().port} in ${
			production ? "Production" : "Development"
		} mode`
	);
});

const io = sockets.listen(server, {});
io.sockets.on("connection", (socket) => {
	console.log("connected");
	let counter = 0;
	setInterval(() => socket.emit("message", { counter: counter++ }), 1000);
});

module.exports = app;
