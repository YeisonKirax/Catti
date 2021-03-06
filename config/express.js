'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var flash = require('connect-flash');
var helpers = require('view-helpers');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var formidable = require('formidable');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var methodOverride = require('method-override');
var path = require('path');
var sessionMiddleware = require('./middlewares/session');
var config = require('./config');
var winston = require('./winston');
var csv = require('ya-csv');
var mediaserver = require('mediaserver');
var Parse = require('csv-parse');
var fs = require('fs');
var contacto= require(config.root+'/app/models/contacto.js');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Yeison123'
});
module.exports = function(app, passport) {

    winston.info('Initializing Express');

    app.set('showStackError', true);    


    //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Setting the fav icon and static folder
    app.use(favicon(config.root + '/public/img/icons/favicon.ico'));
    app.use(express.static('./public'));


    app.use('/jquery', express.static(path.join(__dirname, 'node_modules','jquery','dist')));

    //Don't use logger for test env
    if (config.NODE_ENV !== 'test') {
        app.use(logger('dev', { "stream": winston.stream }));
    }

    //Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    //Enable jsonp
    app.enable("jsonp callback");

    //cookieParser should be above session
    app.use(cookieParser());

    // request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({ extended: true }));


    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {

            cb(null, 'data.csv');

        }
    });
    var mp3 = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {

            cb(null, file.originalname);

        }
    });
    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    var musica = multer({
        storage: mp3
    }).single('file');

    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0,err_desc:null});

            var filePath = path.join(__dirname, '../uploads', 'data.csv');
            var file = fs.readFileSync(filePath, 'utf-8');
            console.log(file);
        });
        connection.query("use db", function(err,rows) {
        });
        connection.query("LOAD DATA LOCAL INFILE '/home/yeison/stack/uploads/data.csv' INTO TABLE `Contactos` FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (`rut`,`verificador`,`nombre`,`apellido`,`email`,`direccion`,`proyecto`,`numero`,`state`)  SET `createdAt` = NOW(),`updatedAt` = NOW();", function(err,rows) {
            console.log(err);

        });

    });


    app.get('/escuchar', function(req,res){
        fs.readFile(path.join(__dirname,'../grabaciones.json'),'utf8', function(err, grabaciones){
            if (err) throw err;
            res.json(JSON.parse(grabaciones));
        })
    });

    app.get('/escuchar/:nombre', function(req,res){
        var grabacion = path.join(__dirname,'../uploads', req.params.nombre);
        mediaserver.pipe(req, res, grabacion);
    });


    app.post('/grabaciones', function(req, res) {
        musica(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0,err_desc:null});

            var filePath = path.join(__dirname, '../uploads', req.file.originalname);
            var file = fs.readFileSync(filePath, 'utf-8');

            var nombre = req.file.originalname;
            fs.readFile(path.join(__dirname,'../grabaciones.json'),'utf8', function(err, arch){
                if(err) throw err;
                var grabaciones = JSON.parse(arch);
                grabaciones.push({nombre: nombre, ruta: '../uploads/'+nombre});
                fs.writeFile(path.join(__dirname,'../grabaciones.json'),JSON.stringify(grabaciones),function(err){
                    if(err) throw err;
                })

            });

        });
    });



    app.use(bodyParser.json());
    app.use(methodOverride());

    //express session configuration
    app.use(sessionMiddleware);

    //connect flash for flash messages
    app.use(flash());

    //dynamic helpers
    app.use(helpers(config.app.name));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());


    // Globbing routing files
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
      require(path.resolve(routePath))(app);
    });

    app.get('*',  function (req, res, next) {
            res.render('index');
    });

    app.use('*',function(req, res){
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });

    app.use(function(err, req, res, next) {

        //Log it
        winston.error(err);

        //Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

};
