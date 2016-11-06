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
exports.proyecto = function(req, res, next, id) {
    console.log('id =>' + id);
    db.Proyecto.find({where : { id: id }}).then(function(proyecto){
        if(!proyecto) {
            return next(new Error('Failed to load proyecto ' + id));
        } else {
            req.proyecto = proyecto;
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
    db.Proyecto.create(req.body).then(function(proyecto){
        if(!proyecto){
            return res.send({errors: new StandardError('Proyecto could not be created')});
        } else {
            return res.jsonp(proyecto);
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
    var proyecto = req.proyecto;

    proyecto.updateAttributes({
        name: req.body.name,
        description: req.body.description
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
    var proyecto = req.proyecto;

    proyecto.destroy().then(function(){
        return res.jsonp(proyecto);
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
    return res.jsonp(req.proyecto);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Proyecto.findAll().then(function(proyectos){

        return res.jsonp(proyectos);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};
