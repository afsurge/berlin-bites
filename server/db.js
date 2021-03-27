const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/catering"
);

// NEWEST AT TOP

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
