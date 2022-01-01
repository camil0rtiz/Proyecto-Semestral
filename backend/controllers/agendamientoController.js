'use strict'

var Agendamiento = require('../modelos/agendamiento.js');

function guardar(req, res) {

    let agendamiento = new Agendamiento()
    agendamiento.rut = req.body.rut
    agendamiento.disponibilidad = req.body.idDisponibilidad
    agendamiento.especialista = req.body.idEspecialista


    agendamiento.save((err, agendamientoguardado) => {

        res.status(200).send({ agendamientoinsertado: agendamientoguardado })

    })

}

function listar(req, res) {
    Agendamiento.find()
        .populate('disponibilidad')
        .populate('especialista')
        .exec((err, disponibilidadagendamiento) => {
            res.status(200).send({ disponibilidadagendamiento })
        })
}

module.exports = {
    guardar,
    listar
};