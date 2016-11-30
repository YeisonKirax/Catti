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
exports.encuesta = function(req, res, next, id) {
    console.log('id =>' + id);
    db.Encuesta.find({where : { id: id }}).then(function(encuesta){
        if(!encuesta) {
            return next(new Error('Failed to load proyecto ' + id));
        } else {
            req.encuesta = encuesta;
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
    db.Encuesta.create(req.body).then(function(encuesta){
        if(!encuesta){
            return res.send({errors: new StandardError('Encuesta no pudo crearse')});
        } else {
            return res.jsonp(encuesta);
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
    var encuesta = req.encuesta;

    encuesta.updateAttributes({
        nombre: req.body.nombre,
        url: req.body.url,
        proyectoname: req.body.proyectoname
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
    var encuesta = req.encuesta;

    encuesta.destroy().then(function(){
        return res.jsonp(encuesta);
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
    return res.jsonp(req.encuesta);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Encuesta.findAll().then(function(encuestas){

        return res.jsonp(encuestas);
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
