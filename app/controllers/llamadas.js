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
exports.llamada = function(req, res, next, id) {
    console.log('id =>' + id);
    db.Llamada.find({where : { id: id }}).then(function(llamada){
        if(!llamada) {
            return next(new Error('Failed to load llamada ' + id));
        } else {
            req.proyecto = llamada;
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
    db.LLamada.create(req.body).then(function(llamada){
        if(!llamada){
            return res.send({errors: new StandardError('Llamada could not be created')});
        } else {
            return res.jsonp(llamada);
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
    var llamada = req.llamada;

    llamada.updateAttributes({
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
    var llamada = req.llamada;

    llamada.destroy().then(function(){
        return res.jsonp(llamada);
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
    return res.jsonp(req.llamada);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Llamada.findAll().then(function(llamadas){

        return res.jsonp(llamadas);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};
