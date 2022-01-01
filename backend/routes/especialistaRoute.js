'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var especialistaController = require('../controllers/especialistaController');
 
// Llamamos al router
var api = express.Router();
 
//  Guardar Autos
api.post('/especialista', especialistaController.guardar);
api.get('/especialista',especialistaController.listar);

// Exportamos la configuración
module.exports = api;

