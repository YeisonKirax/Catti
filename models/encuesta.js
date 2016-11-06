"use strict";

module.exports = function(sequelize, DataTypes) {
    var Encuesta= sequelize.define("Encuesta", {
        questions: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Encuesta.hasMany(models.Pregunta);
                Encuesta.hasMany(models.Llamada);
            }
        }

    });
    return Encuesta;
};