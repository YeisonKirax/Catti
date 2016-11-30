"use strict";

module.exports = function(sequelize, DataTypes) {
    var Llamada= sequelize.define("Llamada", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            unique: true
        },
        nombre: {
            type: DataTypes.STRING,
            primaryKey: true

        }
    });
    return Llamada;
};