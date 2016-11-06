"use strict";

module.exports = function(sequelize, DataTypes) {
    var Admin= sequelize.define("Admin", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Admin.hasMany(models.Proyecto)
            }
        }
    });
    return Admin;
};
