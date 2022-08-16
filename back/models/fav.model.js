const { sequelize, Sequelize } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const Fav = sequelize.define('fav', {
    });

    return Fav
};