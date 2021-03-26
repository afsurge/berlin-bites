const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
// const cookieSession = require("cookie-session");
// const db = require("./db");
const { hash, compare } = require("./utils/bc");
// const csurf = require("csurf");
// const crs = require("crypto-random-string");
// const ses = require("./ses");
// const multer = require("multer");
// const uidSafe = require("uid-safe");
// const s3 = require("./s3");
// const config = require("./config.json");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
