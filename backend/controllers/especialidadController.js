'use strict'

var Especialidad = require('../modelos/especialidad.js');

function guardar(req, res) {

    let especialidad = new Especialidad()
    especialidad.nombre = req.body.nombre



    especialidad.save((err, especialidadguardada) => {

        res.status(200).send({ especialidadInsertada: especialidadguardada })

    })

}

function todos(req, res) {

    Especialidad.find({}, (err, especialidad) => {
        if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
        if (!especialidad) return res.status(404).send({ message: 'Error la persona no existe' })

        res.status(200).send({ especialidad })
    })
}

module.exports = {
    guardar,
    todos
};