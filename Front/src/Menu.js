import React, { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, } from '@material-ui/pickers';
import { Container, Grid, Button, Typography, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, styled, Paper } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
import axios from 'axios';
import deLocale from "date-fns/locale/es";


export default function Menu() {

    const [fecha, setFecha] = useState(new Date());
    const [especialistas, setEspecialista] = useState([])
    const [hora, setHora] = useState("")
    const [espe, setEspe] = useState("")

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleDateChange = (date) => {
        // let date1 = new Date();

        // if(date < date1){
        //     alert("fecha incorrecta")
        // }

        setFecha(date)
        console.log(date)

    }


    const handleChangeEspecialista = (event) => {
        setEspe(event.target.value)
        console.log(event.target.value)
    }

    const handleChangeHora = (event) => {
        setHora(event.target.value)
        console.log(event.target.value)
    }



    useEffect(() => {
        const token = localStorage.getItem('TOKEN_APP_TALLER');
        if (token == null) {
            window.location = '/';
        }

        validaUsuario()

    }, []);

    useEffect(() => {

        getEspecialista()

    }, [])

    const enviarDatos = () => {


        if(espe === "" || hora ==="" || fecha === ""){

            alert("Debe completar todos los campos")

        }else{

            guardarDisponibilidad();

            setFecha(new Date()) 
            setHora("")
            setEspe("") 
        }

    }

    const validaUsuario = () => {

        axios.get("/api/usuario/vigencia")
            .then(
                (response) => {
                    if (response.data.usuario.activo === false) {

                        window.location = '/';

                    }
                }

            )
    }

    function guardarDisponibilidad() {
        axios.post('/api/disponibilidad', {
            fecha: fecha,
            hora: hora,
            disponible: true,
            idEspecialista: espe
        })
            .then(function (response) {

                if (response.status === 200) {

                    getEspecialista()
                    alert("guardado")

                } else {
                    alert("Error al guardar")
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function getEspecialista() {
        try {
            const response = await axios.get('/api/especialista');
            if (response.status === 200) {

                setEspecialista(response.data.especialidadconEspecialista)
                //console.log(response.data);

            }
        } catch (error) {

            console.error(error);
        }
    }

    return (

        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} style={{ padding: 20 }}>
                    <Typography align='center' variant="h6">
                        Disponibilidad de horario
                    </Typography>
                </Grid>
                {/* <input type="hidden" placeholder="Nombre" name="nombre" onChange={handleInputChangeId} value={id}></input> */}
                <Grid item xs={12} md={12} style={{ padding: 20 }} fullWidth>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Especialista</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={espe}
                            label="Especialista"
                            onChange={handleChangeEspecialista}
                        >
                            <MenuItem value="">
                                <em>Ningúno</em>
                            </MenuItem>
                            {especialistas.map((especialista) => (
                                <MenuItem value={especialista._id}>{especialista.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} style={{ padding: 20 }}>
                    <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                        <KeyboardDatePicker label="Fecha" clearable placeholder="10/10/2018" format="dd/MM/yyyy" disablePast inputVariant="outlined" value={fecha} onChange={handleDateChange} />
                    </MuiPickersUtilsProvider>

                </Grid>
                <Grid item xs={12} md={12} style={{ padding: 20 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Selecione hora</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={hora} onChange={handleChangeHora}>
                            <Grid item xs={12} md={12} spacing={8}>
                                <Item>
                                    <FormControlLabel value="8:00" control={<Radio />} label="8:00" />
                                    <FormControlLabel value="8:15" control={<Radio />} label="8:15" />
                                    <FormControlLabel value="8:30" control={<Radio />} label="8:30" />
                                    <FormControlLabel value="8:45" control={<Radio />} label="8:45" />
                                    <FormControlLabel value="9:00" control={<Radio />} label="9:00" />
                                    <FormControlLabel value="9:15" control={<Radio />} label="9:15" />
                                    <FormControlLabel value="9:30" control={<Radio />} label="9:30" />
                                    <FormControlLabel value="9:45" control={<Radio />} label="9:45" />
                                    <FormControlLabel value="10:00" control={<Radio />} label="10:00" />
                                    <FormControlLabel value="10:15" control={<Radio />} label="10:15" />
                                    <FormControlLabel value="10:30" control={<Radio />} label="10:30" />
                                    <FormControlLabel value="10:45" control={<Radio />} label="10:45" />
                                    <FormControlLabel value="11:00" control={<Radio />} label="11:00" />
                                    <FormControlLabel value="11:15" control={<Radio />} label="11:15" />
                                    <FormControlLabel value="11:30" control={<Radio />} label="11:30" />
                                    <FormControlLabel value="11:45" control={<Radio />} label="11:45" />
                                    <FormControlLabel value="12:00" control={<Radio />} label="12:00" />
                                    <FormControlLabel value="12:15" control={<Radio />} label="12:15" />
                                    
                                </Item>
                                <Item>
                                    <FormControlLabel value="12:30" control={<Radio />} label="12:30" />
                                    <FormControlLabel value="12:45" control={<Radio />} label="12:45" />
                                    <FormControlLabel value="13:00" control={<Radio />} label="13:00" />
                                    <FormControlLabel value="13:15" control={<Radio />} label="13:15" />
                                    <FormControlLabel value="13:30" control={<Radio />} label="13:30" />
                                    <FormControlLabel value="13:45" control={<Radio />} label="13:45" />
                                    <FormControlLabel value="14:00" control={<Radio />} label="14:00" />
                                    <FormControlLabel value="14:15" control={<Radio />} label="14:15" />
                                    <FormControlLabel value="14:30" control={<Radio />} label="14:30" />
                                    <FormControlLabel value="14:45" control={<Radio />} label="14:45" />
                                    <FormControlLabel value="15:00" control={<Radio />} label="15:00" />
                                    <FormControlLabel value="15:15" control={<Radio />} label="15:15" />
                                    <FormControlLabel value="15:30" control={<Radio />} label="15:30" />
                                    <FormControlLabel value="15:45" control={<Radio />} label="15:45" />
                                    <FormControlLabel value="16:00" control={<Radio />} label="16:00" />
                                    <FormControlLabel value="16:15" control={<Radio />} label="16:15" />
                                    <FormControlLabel value="16:30" control={<Radio />} label="16:30" />
                                    <FormControlLabel value="16:45" control={<Radio />} label="16:45" />
                                   

                                </Item>
                                <Item>
                                    <FormControlLabel value="17:00" control={<Radio />} label="17:00" />
                                    <FormControlLabel value="17:15" control={<Radio />} label="17:15" />
                                    <FormControlLabel value="17:30" control={<Radio />} label="17:30" />
                                    <FormControlLabel value="17:45" control={<Radio />} label="17:45" />
                                    <FormControlLabel value="18:00" control={<Radio />} label="18:00" />
                                    <FormControlLabel value="18:15" control={<Radio />} label="18:15" />
                                    <FormControlLabel value="18:30" control={<Radio />} label="18:30" />
                                    <FormControlLabel value="18:45" control={<Radio />} label="18:45" />
                                    <FormControlLabel value="19:00" control={<Radio />} label="19:00" />
                                    <FormControlLabel value="19:15" control={<Radio />} label="19:15" />
                                    <FormControlLabel value="19:30" control={<Radio />} label="19:30" />
                                    <FormControlLabel value="19:45" control={<Radio />} label="19:45" />
                                    <FormControlLabel value="20:00" control={<Radio />} label="20:00" />
                                    <FormControlLabel value="20:15" control={<Radio />} label="20:15" />
                                    <FormControlLabel value="20:30" control={<Radio />} label="20:30" />
                                    <FormControlLabel value="20:45" control={<Radio />} label="20:45" />
                                    <FormControlLabel value="21:00" control={<Radio />} label="21:00" />
                                </Item>
                            </Grid>

                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={2} style={{ padding: 20 }}>
                    <Button variant="contained" color="primary" onClick={enviarDatos} fullWidth>Guardar</Button>
                </Grid>

            </Grid>
        </Container>

    )
}