const spicedPg = require("spiced-pg");
const { ids } = require("webpack");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/catering"
);

// NEWEST AT TOP

module.exports.addOrderItems = (order_id, food_id, amount) => {
    const q = `
        INSERT INTO orderitems (order_id, food_id, amount) 
        VALUES ($1, $2, $3)
    `;
    const params = [order_id, food_id, amount];
    return db.query(q, params);
};

module.exports.addOrder = (user_id, bill) => {
    const q = `
        INSERT INTO orders (user_id, bill) 
        VALUES ($1, $2)
        RETURNING id
    `;
    const params = [user_id, bill];
    return db.query(q, params);
};

module.exports.getFoodByIds = (ids) => {
    const q = `
        SELECT *
        FROM food
        WHERE id = ANY($1)
    `;
    const params = [ids];
    return db.query(q, params);
};

module.exports.getFoodById = (id) => {
    const q = `
        SELECT *
        FROM food
        WHERE id = $1
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.getFoodByType = (type) => {
    const q = `
        SELECT *
        FROM food
        WHERE type = $1
    `;
    const params = [type];
    return db.query(q, params);
};

module.exports.addFood = (name, type, description, price, imgurl) => {
    const q = `
        INSERT INTO food (name, type, description, price, imgurl) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
    `;
    const params = [name, type, description, price, imgurl];
    return db.query(q, params);
};

module.exports.getUserById = (id) => {
    const q = `
        SELECT *
        FROM users
        WHERE id = $1
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.updatePass = (hashedpass, email) => {
    const q = `
        UPDATE users
        SET hashpass = $1
        WHERE email = $2
    `;
    const params = [hashedpass, email];
    return db.query(q, params);
};

module.exports.getCode = (email) => {
    const q = `
        SELECT dcode
        FROM resetcodes
        WHERE user_email = $1
        ORDER BY id DESC
        LIMIT 1
    `;
    const params = [email];
    return db.query(q, params);
};

module.exports.addCode = (email, dcode) => {
    const q = `
        INSERT INTO resetcodes (user_email, dcode)
        VALUES ($1, $2)
        RETURNING id
    `;
    const params = [email, dcode];
    return db.query(q, params);
};

module.exports.getUserByEmail = (email) => {
    const q = `
        SELECT id, hashpass
        FROM users
        WHERE email = $1
    `;
    const params = [email];
    return db.query(q, params);
};

module.exports.addUser = (first, last, phone, address, email, hashpass) => {
    const q = `
        INSERT INTO users (first, last, phone, address, email, hashpass) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `;
    const params = [first, last, phone, address, email, hashpass];
    return db.query(q, params);
};
