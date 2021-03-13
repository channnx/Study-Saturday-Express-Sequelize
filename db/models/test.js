const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

const Test = db.define('text', {
    subject : {
        type: Sequelize.STRING,
        allowNull: false
    },
    grade: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});
Test.belongsTo(Student)
module.exports = Test;
