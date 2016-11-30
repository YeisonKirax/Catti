'use strict';

/**
* Module dependencies.
*/
var admins = require('../../app/controllers/usuarios'),
contactos =require('../../app/controllers/contactosA');

module.exports = function(app) {
// Article Routes
app.route('/api/contactos')
    .get(contactos.all);
app.route('/api/contactos/:contactoID')
    .get(contactos.show)
    .put(admins.requiresLogin, contactos.update)
    .delete(admins.requiresLogin, contactos.destroy);

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('contactoID', contactos.contacto);
};

