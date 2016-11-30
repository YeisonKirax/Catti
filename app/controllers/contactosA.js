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
exports.contacto = function(req, res, next, id) {
    console.log('id =>' + id);
    db.Contacto.find({where : { id: id }}).then(function(contacto){
        if(!contacto) {
            return next(new Error('Failed to load proyecto ' + id));
        } else {
            req.contacto = contacto;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

exports.create = function(req, res) {
    // augment the article by adding the UserId
    // save and return and instance of article on the res object.
    db.Contacto.create(req.body).then(function(contacto){
        if(!contacto){
            return res.send({errors: new StandardError('Contacto could not be created')});
        } else {
            return res.jsonp(contacto);
        }
    }).catch(function(err){
        return res.send({
            errors: err,
            status: 500
        });
    });
};

exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var contacto = req.contacto;

    contacto.updateAttributes({
        rut: req.body.rut,
        verificador: req.body.verificador,
        nombre: req.body.nombre,
        apellido: req.body.appellido,
        email: req.body.email,
        direccion:req.body.direccion,
        proyecto: req.body.proyecto,
        numero: req.body.numero,
        state: req.body.state
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
 * Delete an article*/
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var contacto = req.contacto;

    contacto.destroy().then(function(){
        return res.jsonp(contacto);
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
    return res.jsonp(req.contacto);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Contacto.findAll().then(function(contactos){

        return res.jsonp(contactos);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.profile.id !== req.user.id) {
        return res.status(401).send('User is not authorized');
    }
    next();
};
