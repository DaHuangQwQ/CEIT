const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const LikeModel = sequelize.define(
    "LikeModel",
    {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
        },
        article:{
            type: DataTypes.STRING
        },
        userID:{
            type: DataTypes.STRING
        }
    },
    {
        tableName: "like",
        paranoid: true,
        deletedAt: "isDelete",
        timestamps: false,
    })

module.exports = LikeModel;