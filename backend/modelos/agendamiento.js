'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AgendamientoSchema = Schema(
    {
        rut:String,
        disponibilidad:{ type: Schema.ObjectId, ref: "disponibilidad"},
        especialista:{ type: Schema.ObjectId, ref: "especialista"}

    })

module.exports = mongoose.model('agendamiento', AgendamientoSchema)    