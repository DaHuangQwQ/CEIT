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
        captcha:{
            type: DataTypes.STRING
        },
        create_date:{
            type: DataTypes.DATE
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            default: 0
        }
    },
    {
        tableName: "captcha",
        paranoid: true,
        deletedAt: "isDelete",
        timestamps: false,
    })

module.exports = LikeModel;