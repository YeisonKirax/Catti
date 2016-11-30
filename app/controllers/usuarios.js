'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');
var getErrorMessage = function(err){
    if(err.errors){
        for(var errName in err.errors){
            if(err.errors[errName].message){
                return err.errors[errName].message;
            }
        }
    }else{
        return 'Error, servidos desconocido';
    }
};
/**
 * Find article by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */

exports.signinAdmin = function(req, res) {
    res.render('admins/adminsignin', {
        title: 'AdminSignin',
        message: req.flash('error')
    });
};
exports.signinUsuario = function(req, res) {
    res.render('usuarios/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};
exports.session = function(req, res) {
    return res.send({status : 'success', message : 'User login successfully.'})

};

exports.signout = function(req, res) {
    console.log('Logout: { id: ' + req.user.id + ', username: ' + req.user.username + '}');
    req.logout();

    return res.redirect('/');

};

exports.me = function(req, res) {
    res.jsonp(req.user || null);
};



exports.usuario = function(req, res, next, id) {
    console.log('id =>' + id);
    db.Usuario.find({where : { id: id }}).then(function(usuario){
        if(!usuario) {
            return next(new Error('Failed to load usuario ' + id));
        } else {
            req.usuario = usuario;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

exports.admin = function(req, res, next, id) {
    console.log('id =>' + id);
    db.Usuario.find({where : { id: id }}).then(function(usuario){
        if(!usuario) {
            return next(new Error('Failed to load usuario ' + id));
        } else {
            req.usuario = usuario;
            return next();
        }
    }).catch(function(err){
        return next(err);
    });
};
/**
 * Create a article
 */
exports.create = function(req, res) {
    // augment the article by adding the UserId
    // save and return and instance of article on the res object.
    db.Usuario.create(req.body).then(function(usuario){
        if(!usuario){
            return res.send({errors: new StandardError('Usuario could not be created')});
        } else {
            return res.jsonp(usuario);
        }
    }).catch(function(err){
        return res.send({
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var usuario = req.usuario;

    usuario.updateAttributes({
        email: req.body.email,
        password: req.body.password
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var usuario = req.usuario;

    usuario.destroy().then(function(){
        return res.jsonp(usuario);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    // Sending down the article that was just preloaded by the articles.article function
    // and saves article on the req object.
    return res.jsonp(req.usuario);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Usuario.findAll({where: {privilegio: 'ENCUESTADOR'}}).then(function(usuarios){

        return res.jsonp(usuarios);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */

