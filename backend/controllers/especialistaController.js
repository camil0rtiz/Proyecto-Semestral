'use strict'

var Especialista = require('../modelos/especialista.js');


function guardar(req,res){

    let especialista = new Especialista()
    especialista.nombre = req.body.nombre
    especialista.especialidad = req.body.idEspecialidad

    especialista.save((err, especialistaguardado) => {

        res.status(200).send({ especialistaInsertado: especialistaguardado })

    })

}



function listar(req, res) {
    Especialista.find()
        .populate('especialidad').exec((err, especialidadconEspecialista) => {
            res.status(200).send({especialidadconEspecialista})
        })
}



module.exports = {
    guardar,
    listar
};
