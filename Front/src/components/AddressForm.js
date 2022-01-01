import * as React from 'react';
// import { useEffect, useState } from 'react';
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';


export default function AddressForm({setEspecia, especia, espe, setEspe, especialista, especialidad, setRut,rut}) {

    const handleChangeRut = (event) => {
        
        setRut(event.target.value)
    }
    
    const handleChangeEspecialidad = (event) => {
        setEspe(event.target.value)
    }

    const handleChangeEspecialista = (event) => {
        setEspecia(event.target.value)
    }

  
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                LLenar Datos
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Rut paciente"
                        value={rut}
                        fullWidth
                        autoComplete="given-name"
                        variant="outlined"
                        onChange={handleChangeRut}
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Especialidad</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={espe}
                            label="Especialidad"
                            onChange={handleChangeEspecialidad}
                        >
                            <MenuItem value="">
                                <em>Ningúno</em>
                            </MenuItem>
                            {especialidad.map((especialidad) => (
                                <MenuItem value={especialidad._id}>{especialidad.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Especialista</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={especia}
                            label="Especialista"
                            onChange={handleChangeEspecialista}
                        >
                            <MenuItem value="">
                                <em>Ningúno</em>
                            </MenuItem>
                            {especialista.filter(especialista => especialista.id_especialidad == espe).map((especialista)=>(
                                
                                <MenuItem value={especialista.id_especialista}>{especialista.nombre}</MenuItem>

                            ))}

                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}