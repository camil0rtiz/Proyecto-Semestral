import * as React from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment'

export default function Review({ fecha, hora, especialidad, especialista, espe, especia }) {

    return (

        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Detalles Agendamiento
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                {moment(fecha).format('LL', "es")} {hora} hora
            </Typography>

            {especialidad.filter(especialidad => especialidad._id === espe).map((especialidad) => (
                <Typography variant="subtitle1" gutterBottom component="div">
                    {especialidad.nombre}
                </Typography>
            ))}

            {especialista.filter(especialista => especialista.id_especialista === especia).map((especialista) => (
                <Typography variant="subtitle1" gutterBottom component="div">
                    {especialista.nombre}
                </Typography>
            ))}
        </React.Fragment>
    );
}