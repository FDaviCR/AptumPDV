const Sequelize = require('sequelize');

/*
const connection = new Sequelize(
    'aptumpdv','root','',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: "-03:00"
    }
);
*/

const connection = new Sequelize('aptumpdv','davi','senhateste',{
    host: 'mysql669.umbler.com',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;
