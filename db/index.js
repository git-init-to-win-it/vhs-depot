const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || "postgresql://localhost:5432/vhsdepot")

module.exports = client