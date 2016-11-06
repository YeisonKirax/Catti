"use strict";

module.exports = function(sequelize, DataTypes) {
    var Proyecto = sequelize.define("Proyecto", {
        name: DataTypes.STRING,
        description: DataTypes.STRING

    },{
        classMethods: {
            associate: function(models) {
                Proyecto.belongsTo(models.Admin);
                Proyecto.hasMany(models.Encuesta);
            }
        }

    });

    return Proyecto;
};