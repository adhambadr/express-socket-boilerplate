import io from "socket.io-client";
import _ from "lodash";
const production =
	process.argv.slice(2)[0] === "prod" ||
	process.env.NODE_ENV === "production";
//const url = "https://sockets.blloc.com";
const url = production ? "https://sockets.blloc.com" : "http://localhost:20201";

console.log("Connecting to ", url);

let socket = io(url, {
	secure: url.indexOf("https") > -1,
});
socket.on("connect_error", console.log);
socket.on("connect", () => {});
socket.on("message", (e) => console.log(e));
