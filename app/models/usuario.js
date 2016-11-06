"use strict";

module.exports = function(sequelize, DataTypes) {
    var Usuario = sequelize.define("Usuario", {
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        privilegio: DataTypes.STRING
    } , {
        classMethods: {
            associate: function(models) {
                Usuario.hasMany(models.Llamada);
                Usuario.hasMany(models.Proyecto);

            }
        }

    });
    return Usuario;
};
