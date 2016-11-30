'use strict';

/**
* Module dependencies.
*/
var usuarios = require('../../app/controllers/usuarios');
var passportadmin = require('passport');
var admin = require('../../app/controllers/admin');

module.exports = function(app) {
// Article Routes
app.route('/api/usuarios')
    .get(usuarios.all)
    .post(usuarios.requiresLogin, usuarios.create);
app.route('/api/usuarios/:usuarioID')
    .get(usuarios.show)
    .put(usuarios.requiresLogin, usuarios.update)
    .delete(usuarios.requiresLogin, usuarios.destroy);
app.get('/signoutUsuario', usuarios.signout);
app.get('/usuarios/me', usuarios.me);
app.post('/usuarios/session', passportadmin.authenticate('local', {
    failureRedirect: '/signinUsuario',
    failureFlash: true
}), usuarios.session);



    /*admins*/
app.get('/signoutAdmin', usuarios.signout);
app.get('/admins/me', usuarios.me);

app.post('/admins', usuarios.create);
app.post('/admins/session', passportadmin.authenticate('admin-login', {
    failureRedirect: '/adminsignin',
    failureFlash: true
}), usuarios.session);

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('usuarioID', usuarios.usuario);
};

