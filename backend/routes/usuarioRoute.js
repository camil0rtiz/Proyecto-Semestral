'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var userController = require('../controllers/usuarioController');
// var autoController = require('../controllers/autoController');

const auth = require('../middlewares/auth')
// Llamamos al router
var api = express.Router();
 
//  Guardar usuario
api.post('/usuario', userController.guardar);
api.get('/usuario',auth.isAuth,userController.todos);
api.post('/usuario/validar', userController.validar);
api.get('/usuario/vigencia',auth.isAuth,userController.validaVigenciaUsuario);
api.put('/usuarios/:id',userController.actualiza);
api.delete('/elimina/:id',userController.eliminar);



// api.post('/autoguardar',autoController.guardar);

// Exportamos la configuración
module.exports = api;