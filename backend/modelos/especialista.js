'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const EspecialistaSchema = Schema(
    {
      nombre:String,
      especialidad:{ type: Schema.ObjectId, ref: "especialidad" }  
    }
)

//hice un cambio 

module.exports = mongoose.model('especialista',EspecialistaSchema)    

