'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const EspecialidadSchema = Schema(
  {
    nombre: String,
  }
)

module.exports = mongoose.model('especialidad', EspecialidadSchema)    