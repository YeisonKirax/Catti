"use strict";

module.exports = function(sequelize, DataTypes) {
    var Proyecto = sequelize.define("Proyecto", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: DataTypes.STRING
    });
    return Proyecto;
};