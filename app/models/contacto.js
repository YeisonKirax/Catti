"use strict";

module.exports = function(sequelize, DataTypes) {
    var Contacto = sequelize.define("Contacto", {
        rut: {
            type: DataTypes.INTEGER
        },
        verificador: DataTypes.INTEGER,
        nombre: DataTypes.STRING,
        apellido:DataTypes.STRING,
        email: DataTypes.STRING,
        direccion: DataTypes.STRING,
        proyecto:   DataTypes.STRING,
        numero: DataTypes.INTEGER,
        state: DataTypes.STRING
    });
    return Contacto;
};