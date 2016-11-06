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

/**
 * Create a article
 */

/**
 * Update a article
 */
exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var contacto = req.contacto;

    contacto.updateAttributes({
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
 * Delete an article
 */
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
