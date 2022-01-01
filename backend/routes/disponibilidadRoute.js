'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var disponibilidadController = require('../controllers/disponibilidadController');
// var autoController = require('../controllers/autoController');

// Llamamos al router
var api = express.Router();
 
//  Guardar Persona
api.post('/disponibilidad', disponibilidadController.guardar);
api.get('/disponibilidad', disponibilidadController.listar);
api.put('/disponibilidad/:id',disponibilidadController.editar);



// api.post('/autoguardar',autoController.guardar);

// Exportamos la confi,guración
module.exports = api;
