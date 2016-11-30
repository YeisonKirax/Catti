'use strict';

/**
* Module dependencies.
*/
var admins = require('../../app/controllers/usuarios'),
encuestas = require('../../app/controllers/encuestas');

module.exports = function(app) {
// Article Routes
app.route('/api/encuestas')
    .get(encuestas.all)
    .post(admins.requiresLogin,encuestas.create);
app.route('/api/encuestas/:encuestaID')
    .get(encuestas.show )
    .put(admins.requiresLogin, encuestas.update)
    .delete(admins.requiresLogin, encuestas.destroy);

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('encuestaID', encuestas.encuesta);
};

