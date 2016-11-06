"use strict";

module.exports = function(sequelize, DataTypes) {
    var Respuesta = sequelize.define("Respuesta", {
        response: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Respuesta.belongsTo(models.Pregunta);
                Respuesta.belongsTo(models.Contacto);
            }
        }

    });
    return Respuesta;
};