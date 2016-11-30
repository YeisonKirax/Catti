'use strict';

var passport = require('passport');
var _ = require('lodash');
// These are different types of authentication strategies that can be used with Passport. 
var LocalStrategy = require('passport-local').Strategy;

var db = require('./sequelize');
var winston = require('./winston');

//Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    console.log(db.Usuario.find({where: {id: id}}));
    db.Usuario.find({where: {id: id}}).then(function(user){
        if(!user){
            winston.warn('Logged in user not in database, user possibly deleted post-login');
            return done(null, false);
        }
        winston.info('Session: { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
    }).catch(function(err){
        done(err, null);
    });
});



//Use local strategy
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    db.Usuario.find({ where: { email: email, password: password, privilegio:'ENCUESTADOR' }}).then(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      }
      else {
        winston.info('Login (local) : { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
      }
    }).catch(function(err){
      done(err);
    });
  }
));
passport.use('admin-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        db.Usuario.find({ where: { email: email, password: password, privilegio: 'ADMIN'}}).then(function(admin) {
            if (!admin) {
                done(null, false, { message: 'Unknown user' });
            }
            else {
                winston.info('Login (local) : { id: ' + admin.id);
                done(null, admin);
            }
        }).catch(function(err){
            done(err);
        });
    }
));
module.exports = passport;

