const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./utils/bc");
const csurf = require("csurf");
const crs = require("crypto-random-string");
const ses = require("./ses");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const config = require("./config.json");

//// socket.io ////
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
//// socket.io ////

//// for S3 upload ////

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

//// for S3 upload ////

//// middlewares ////
const cookieSessionMware = cookieSession({
    secret: `I love to eat.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});
app.use(cookieSessionMware);
io.use(function (socket, next) {
    cookieSessionMware(socket.request, socket.request.res, next);
});
// app.use(
//     cookieSession({
//         secret: `I love to eat.`,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//     })
// );
app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("dtoken", req.csrfToken());
    next();
});
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());
//// middlewares ////

//// routes ////

app.post("/register", (req, res) => {
    const { first, last, phone, address, email, password } = req.body;

    if (password == undefined) {
        return res.json({ success: false });
    }

    hash(password)
        .then((hashedpass) => {
            db.addUser(first, last, phone, address, email, hashedpass)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log(
                        "Error with adding user (server):",
                        err.message
                    );
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("Error with hashing password:", err.message);
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email == "" || password == "") {
        return res.json({ success: false });
    }
    db.getUserByEmail(email)
        .then(({ rows }) => {
            const hashpass = rows[0].hashpass;
            const id = rows[0].id;
            compare(password, hashpass).then((match) => {
                if (match) {
                    req.session.userId = id;
                    res.json({ success: true });
                } else {
                    console.log("Password does not match!");
                    return res.json({ success: false });
                }
            });
        })
        .catch((err) => {
            console.log("Error getting user info at login:", err.message);
            return res.json({ success: false });
        });
});

app.post("/pass/reset/start", (req, res) => {
    const { email } = req.body;
    const dCode = crs({ length: 6 });
    if (email == null) {
        return res.json({ success: false });
    }

    db.addCode(email, dCode)
        .then(() => {
            ses.sendEmail(
                "abrarfaisal20@gmail.com",
                "Your secret code for resetting your account password at GOLPO: " +
                    dCode,
                "Reset password for your GOLPO account"
            )
                .then(() => {
                    console.log("It worked, email sent!");
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("Error in sending email:", err.message);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("Error in adding secret code:", err.message);
            // res.json({ success: false });
        });
});

app.post("/pass/reset/verify", (req, res) => {
    // console.log("req.body in reset verify:", req.body);
    const { code, email, newpass } = req.body;
    if (code == null || newpass == null) {
        return res.json({ success: false });
    }

    db.getCode(email)
        .then(({ rows }) => {
            if (rows[0].dcode == code) {
                hash(newpass)
                    .then((hashedpass) => {
                        db.updatePass(hashedpass, email)
                            .then(() => {
                                console.log("Password updated!");
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log(
                                    "Error updating password:",
                                    err.message
                                );
                            });
                        console.log("Hashed reset pass!");
                    })
                    .catch((err) => {
                        console.log(
                            "Error hashing reset password:",
                            err.message
                        );
                    });
                console.log("Secret code matched!");
            } else {
                console.log("Secret code does not match!");
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("Error checking secret code:", err.message);
            res.json({ success: false });
        });
});

app.get("/user", (req, res) => {
    const userId = req.session.userId;
    db.getUserById(userId)
        .then(({ rows }) => {
            res.json({ rows });
        })
        .catch((err) => {
            console.log("Error getting logged in user:", err.message);
        });
});

app.post("/uploadfood", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const fullUrl = config.s3Url + filename;
    // console.log("fullUrl:", fullUrl);
    if (fullUrl) {
        res.json({ imgurl: fullUrl });
    } else {
        console.log("Error with fullUrl:", fullUrl);
    }
});

app.post("/addfood", (req, res) => {
    // console.log("req.body for adding food:", req.body);
    const { name, type, description, price, imgurl } = req.body;
    db.addFood(name, type, description, price, imgurl)
        .then(({ rows }) => {
            console.log("Added new food with id:", rows[0].id);
            res.json({ success: true, id: rows[0].id });
        })
        .catch((err) => {
            console.log("Error adding new food:", err.message);
        });
});

app.get("/food/:type.json", (req, res) => {
    const type = req.params.type;
    db.getFoodByType(type)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("Error getting food by type:", err.message);
        });
});

app.get("/foodDetails/:id", (req, res) => {
    const foodId = req.params.id;
    // console.log("Food details requested for foodId:", foodId);
    db.getFoodById(foodId)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            "Error getting food by id:", err.message;
        });
});

app.get("/basketfood/:ids", (req, res) => {
    const foodIds = req.params.ids.split(",");
    console.log("Basket foodIds:", foodIds);
    db.getFoodByIds(foodIds)
        .then(({ rows }) => {
            // console.log("Food info for basket:", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("Error getting food info for basket:", err.message);
        });
});

app.post("/order", (req, res) => {
    console.log("Order received:", req.body);
    const { user_id, bill, basket } = req.body;
    db.addOrder(user_id, bill)
        .then(({ rows }) => {
            const orderId = rows[0].id;
            console.log("Order added with id:", orderId);
            for (let i = 0; i < basket.length; i++) {
                db.addOrderItems(orderId, basket[i].id, basket[i].amount)
                    .then(() => {
                        console.log("Added order items for i:", i);
                    })
                    .catch((err) => {
                        console.log(
                            `Error adding order items for i=${i}: ${err.message}`
                        );
                    });
            }
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("Error adding order:", err.message);
        });
});

app.get("/orders/:id", (req, res) => {
    const userId = req.params.id;
    // console.log("Request orders for userId:", userId);
    if (userId != 1) {
        // db.getOrdersByUserId(userId)
        //     .then(({ rows }) => {
        //         console.log("All orders by this user:", rows);
        //         res.json(rows);
        //     })
        //     .catch((err) => {
        //         console.log(
        //             "Error getting orders of specific user:",
        //             err.message
        //         );
        //     });

        db.getOrdersByUserId(userId)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch((err) => {
                console.log("Error getting orders for this user:", err.message);
            });
    }
});

app.get("/orderitems/:id", (req, res) => {
    const orderId = req.params.id;
    db.getItemsByOrderId(orderId)
        .then(({ rows }) => {
            // console.log("Items for this order:", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log(
                `Error getting items for order ${orderId}: ${err.message}`
            );
        });
});

app.get("/allorders", (req, res) => {
    db.getAllOrders()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("Error getting all orders for admin:", err.message);
        });
});

app.post("/uploadppic", uploader.single("file"), s3.upload, (req, res) => {
    const userId = req.session.userId;
    const { filename } = req.file;
    const fullUrl = config.s3Url + filename;
    console.log("fullUrl:", fullUrl);

    db.getppicUrl(userId)
        .then(({ rows }) => {
            const ppicToDelete = rows[0].ppicurl;
            console.log("ppicurl to delete and update:", ppicToDelete);
            const fileToDelete = ppicToDelete.slice(38);
            // console.log(
            //     "filename of ppic to delete after upload:",
            //     fileToDelete
            // );
            s3.delete(fileToDelete);
        })
        .catch((err) => {
            console.log("Error getting previous profile pic:", err.message);
        });

    db.updateppic(fullUrl, userId)
        .then(() => {
            console.log("profile pic link added to database!");
            res.json({ ppicurl: fullUrl });
        })
        .catch((err) => {
            console.log("Error updating profile pic:", err.message);
        });
});

app.post("/profile", (req, res) => {
    const userId = req.session.userId;
    const { email, address, phone } = req.body;
    console.log("Received profile (server):", email, address, phone);
    db.updateProfile(email, address, phone, userId)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("Error updating profile (server):", err.message);
        });
});

app.get("/user/:id.json", (req, res) => {
    console.log("ID of user for OtherProfile:", req.params.id);
    const otherId = req.params.id;
    const userId = req.session.userId;
    db.getUserById(otherId)
        .then(({ rows }) => {
            rows[0].currentId = userId;
            res.json({ rows });
        })
        .catch((err) => {
            "Error getting otherId info:", err.message;
            res.json({ success: false });
        });
});

app.get("/users.json", (req, res) => {
    db.getRecentUsers()
        .then(({ rows }) => {
            // console.log("Recent users:", rows);
            res.json({ rows });
        })
        .catch((err) => {
            "Error getting recent users:", err.message;
        });
});

app.get("/users/:name", (req, res) => {
    const name = req.params.name;
    console.log("Search term in server:", name);
    if (name != "undefined") {
        db.getSearchUsers(name)
            .then(({ rows }) => {
                // console.log("Searched users:", rows);
                res.json({ rows });
            })
            .catch((err) => {
                "Error getting searched users:", err.message;
            });
    } else {
        db.getRecentUsers()
            .then(({ rows }) => {
                // console.log("Recent users (search):", rows);
                res.json({ rows });
            })
            .catch((err) => {
                "Error getting recent users (search):", err.message;
            });
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

//// routes ////

server.listen(process.env.PORT || 3001, function () {
    console.log(".: 🍽️  Delicacies are about to be served 🍱️ :.");
});

io.on("connection", (socket) => {
    const userId = socket.request.session.userId;
    if (!userId) {
        return socket.disconnect(true);
    }

    // if (userId === 1) {
    db.getMessages()
        .then(({ rows }) => {
            // console.log("Last 10 messages:", rows.reverse());
            socket.emit("chatMessages", rows.reverse());
        })
        .catch((err) => {
            console.log("Error getting latest chat messages:", err.message);
        });
    // } else {
    //     db.getMessagesForUser([1, userId])
    //         .then(({ rows }) => {
    //             // console.log("Last 10 messages:", rows.reverse());
    //             socket.emit("chatMessages", rows.reverse());
    //         })
    //         .catch((err) => {
    //             console.log("Error getting latest chat messages:", err.message);
    //         });
    // }

    socket.on("chatMessageByUser", (data) => {
        console.log(`New chat msg by userId:${userId} with msg:${data}`);
        db.addMessage(userId, data)
            .then(({ rows }) => {
                const created_at = rows[0].created_at;
                const msg_id = rows[0].id;
                console.log("Chat msg added to db!");
                db.getUserById(userId)
                    .then(({ rows }) => {
                        // console.log("Details of chat msg sender:", rows[0]);
                        io.emit("chatMessageByUser", {
                            first: rows[0].first,
                            last: rows[0].last,
                            ppicurl: rows[0].ppicurl,
                            id: msg_id,
                            msg: data,
                            created_at: created_at,
                        });
                    })
                    .catch((err) => {
                        console.log(
                            "Error getting details of chat msg sender:",
                            err.message
                        );
                    });
            })
            .catch((err) => {
                console.log("Error adding chat msg to db:", err.message);
            });

        console.log(
            `socket with id:${socket.id} with userId:${userId} has connected!`
        );

        socket.on("disconnect", () => {
            console.log(
                `socket with id:${socket.id} with userId:${userId} has DISCONNECTED!`
            );
        });
    });
});
