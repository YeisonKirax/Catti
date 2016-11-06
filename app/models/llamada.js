"use strict";

module.exports = function(sequelize, DataTypes) {
    var Llamada= sequelize.define("Llamada", {
        duracion: DataTypes.INTEGER,
        fecha: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                Llamada.belongsTo(models.Contacto);
                Llamada.belongsTo(models.Usuario);
                Llamada.belongsTo(models.Encuesta);
            }
        }

    });
    return Llamada;
};