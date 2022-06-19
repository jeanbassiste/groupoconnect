const { sequelize, Sequelize } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const Comment = sequelize.define('comment', {
        text: {
            type: Sequelize.STRING
        }
    });

    return Comment
};