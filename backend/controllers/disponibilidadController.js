'use strict'

var Disponibilidad = require('../modelos/disponibilidad.js');

function guardar(req, res) {

    let disponibilidad = new Disponibilidad()
    disponibilidad.fecha = req.body.fecha
    disponibilidad.hora = req.body.hora
    disponibilidad.disponible = req.body.disponible
    disponibilidad.especialista = req.body.idEspecialista


    disponibilidad.save((err, disponibilidadguardada) => {

        res.status(200).send({ disponibilidadInsertada: disponibilidadguardada })

    })

}

function listar(req, res) {
    Disponibilidad.find()
        .populate('especialista').exec((err, disponibilidaddeEspecialista) => {
            res.status(200).send({ disponibilidaddeEspecialista })
        })
}

function editar(req, res){

    let idEspecialista = req.params.id

    let disponible = req.body.disponible;

    Disponibilidad.findByIdAndUpdate(idEspecialista,{disponible: disponible}, (err,disponibilidad)=>{

        if (err) return res.status(500).send({ message: 'error al realizar la peticion' })

        res.status(200).send({ message: 'Editado correctamente ',data: disponibilidad})

    })

}


module.exports = {
    guardar,
    listar,
    editar
};