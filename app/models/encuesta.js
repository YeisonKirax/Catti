"use strict";

module.exports = function(sequelize, DataTypes) {
    var Encuesta= sequelize.define("Encuesta", {
        nombre: DataTypes.STRING,
        url: DataTypes.STRING,
        proyectoname:{
            type: DataTypes.STRING
        }
    });
    return Encuesta;
};