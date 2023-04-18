const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 用户模型
 * @author DaHuang
 */
const UserModel = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        introduction: {
            type: DataTypes.TEXT,
        },
        contest :{
            type: DataTypes.STRING,
        },
        skillStack: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        sex: {
            type: DataTypes.CHAR,
        },
        birth: {
            type: DataTypes.DATE,
        },
        addr: {
            type: DataTypes.STRING,
        },
        createTime: {
            type: DataTypes.DATE,
        },
        updateTime: {
            type: DataTypes.DATE,
        },
        role: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "userlist",
        paranoid: true,
        deletedAt: "isDelete",
        timestamps: false,
    }
);

module.exports = UserModel;
