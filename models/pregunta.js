"use strict";

module.exports = function(sequelize, DataTypes) {
    var Pregunta = sequelize.define("Pregunta", {
        question: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                Pregunta.belongsTo(models.Encuesta);
                Pregunta.hasOne(models.Respuesta);
            }
        }


    });
    return Pregunta;
};