const { sequelize, Sequelize } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const Like = sequelize.define('like', {
    });

    return Like
};