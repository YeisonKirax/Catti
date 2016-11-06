"use strict";

module.exports = function(sequelize, DataTypes) {
    var Contacto = sequelize.define("Contacto", {
        name: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        email: DataTypes.STRING,
        direccion: DataTypes.STRING,
        state: DataTypes.STRING
    },  {
        classMethods: {
            associate: function(models) {
                Contacto.hasMany(models.Llamada);
                Contacto.hasMany(models.Respuesta);
            }
        }

    });
    return Contacto;
};