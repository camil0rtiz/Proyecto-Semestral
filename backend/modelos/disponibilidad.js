'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DisponibilidadSchema = Schema(
    {
        
        fecha:Date,
        hora:String,
        disponible: { type: Boolean, default: true },
        especialista:{ type: Schema.ObjectId, ref: "especialista" }


    })

module.exports = mongoose.model('disponibilidad', DisponibilidadSchema)    