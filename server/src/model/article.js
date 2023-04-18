const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 文章模型
 * @author DaHuang
 */
const ArticleModel = sequelize.define(
    "Article",
    {
        id: {
            type: DataTypes.STRING,
            autoIncrement: true,
            primaryKey: true,
        },
        // Model attributes are defined here
        userID: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.TEXT,
        },
        isVis: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
        title: {
            type: DataTypes.STRING,
        },
        sort: {
            type: DataTypes.STRING,
        },
        tag: {
            type: DataTypes.STRING,
        },
        describe: {
            type: DataTypes.STRING,
        },
        createTime: {
            type: DataTypes.DATE,
        },
        updateTime: {
            type: DataTypes.DATE,
        },
        view: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        tableName: "article",
        paranoid: true,
        deletedAt: "isDelete",
        timestamps: false,
    }
);

module.exports = ArticleModel;
