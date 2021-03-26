const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/catering"
);

module.exports.addUser = (first, last, phone, address, email, hashpass) => {
    const q = `
        INSERT INTO users (first, last, phone, address, email, hashpass) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `;
    const params = [first, last, phone, address, email, hashpass];
    return db.query(q, params);
};
