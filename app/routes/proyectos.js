'use strict';

/**
* Module dependencies.
*/
var admins = require('../../app/controllers/usuarios'),
proyectos = require('../../app/controllers/proyectos');

module.exports = function(app) {
// Article Routes
app.route('/api/proyectos')
    .get(proyectos.all)
    .post(admins.requiresLogin, proyectos.create);
app.route('/api/proyectos/:proyectoID')
    .get(proyectos.show)
    .put(admins.requiresLogin, proyectos.update)
    .delete(admins.requiresLogin, proyectos.destroy);

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('proyectoID', proyectos.proyecto);
};

