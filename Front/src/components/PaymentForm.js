import * as React from 'react';
import { Table, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import axios from 'axios';
import { useEffect} from 'react';
import moment from 'moment'
import 'moment/locale/es';

//Listado de horarios disponible

export default function PaymentForm({ especia, disponibilidad, setDisponibilidad, setDispo, setFecha, setHora }) {


    moment.locale('es');

    useEffect(() => {

        getDisponibilidad()

    }, [])

    const enviarDatos = (disponi) => {
        
        setDispo(disponi._id)
        setFecha(disponi.fecha)
        setHora(disponi.hora)

        actualizarDisponible(disponi._id);
        // guardarAgendamiento(disponi._id);
    }
    
    const actualizarDisponible = async (id) => {

        try {

            const response = await axios.put(`/api/disponibilidad/${id}`, {
                disponible: false,

            });

            if (response.status === 200) {

                getDisponibilidad()
                //console.log(response.data);
            }

        } catch (error) {
            console.error(error);
        }

    }

    async function getDisponibilidad() {
        try {
            const response = await axios.get('/api/disponibilidad');
            if (response.status === 200) {


                setDisponibilidad(response.data.disponibilidaddeEspecialista);


            }
        } catch (error) {

            console.error(error);
        }
    }

    return (



        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Horarios Disponibles
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="center">Hora</TableCell>
                            <TableCell align="center">Confirmar Hora</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {disponibilidad.filter(disponibilidad => (disponibilidad.disponible === true && (disponibilidad.especialista._id === especia))).sort(function(a, b) { a = new Date(a.fecha); b = new Date(b.fecha); return a<b ? -1 : a>b ? 1 : 0; }).sort((a,b)=>{ if (a.hora < b.hora) return -1;
                            else if (a.hora > b.hora)
                                return 1;
                            else 
                            return 0 }).map((disponibilidad) => (
                            
                            <TableRow
                                // key={disponibilidad._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* <TableCell component="th" scope="row">
                                    {disponibilidad._id}
                                </TableCell> */}
                                <TableCell component="th" scope="row" align="center">{moment(disponibilidad.fecha).format('LL',"es")}</TableCell>
                                <TableCell align="center">{disponibilidad.hora}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => enviarDatos(disponibilidad)} size="small" color="primary" variant="contained">Confirmar</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

        </React.Fragment>
    );
}