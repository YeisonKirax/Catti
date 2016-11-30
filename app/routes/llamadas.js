'use strict';

/**
* Module dependencies.
*/
var admins = require('../../app/controllers/usuarios'),
llamadas = require('../../app/controllers/llamadas'),
contactos =require('../../app/controllers/contactos');

module.exports = function(app) {
// Article Routes
app.route('/api/llamadas')
    .get(llamadas.all)
    .post(admins.requiresLogin, llamadas.create);
app.route('/api/llamadas/:llamadaID')
    .get(llamadas.show)
    .put(admins.requiresLogin, llamadas.update)
    .delete(admins.requiresLogin, llamadas.destroy);

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('llamadaID', llamadas.llamada);
};

