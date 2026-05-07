const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'TODoListDb',
    'RuslanJT',
    'Ruslan1606',
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
);

module.exports = sequelize;

sequelize.authenticate()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Error:", err));