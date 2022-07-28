const { sequelize, Sequelize } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    
    const Post = sequelize.define('post', {
        title: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        },
        tag: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    });

    return Post
};