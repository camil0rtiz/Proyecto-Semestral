'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos el controlador
var especialidadController = require('../controllers/especialidadController');

// Llamamos al router
var api = express.Router();

api.post('/especialidad', especialidadController.guardar);
api.get('/especialidad',especialidadController.todos);

module.exports = api;

