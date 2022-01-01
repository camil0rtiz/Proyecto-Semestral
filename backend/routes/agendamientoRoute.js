'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var agendamientoController = require('../controllers/agendamientoController');

// Llamamos al router
var api = express.Router();

//  Guardar Persona
api.post('/agendamiento', agendamientoController.guardar);
api.get('/agendamiento', agendamientoController.listar);


// Exportamos la confi,guración
module.exports = api;

