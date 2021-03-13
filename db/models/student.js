const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {  // to check the validation of the email
            // to make sure it a real email
            isEmail: true
        }
    }
});
//hooks
Student.beforeCreate((student) => {
    const nameFirst = student.firstName;
    const nameLast = student.lastName;
  
    student.firstName = nameFirst[0].toUpperCase() + nameFirst.slice(1);
    student.lastName = nameLast[0].toUpperCase() + nameLast.slice(1);
})

module.exports = Student;
