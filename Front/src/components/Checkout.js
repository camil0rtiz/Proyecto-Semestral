import * as React from 'react';
import { Container, Box, Button, Typography, AppBar, CssBaseline, Toolbar, Paper, Stepper, Step, StepLabel, Link, ThemeProvider, createTheme } from '@material-ui/core';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['LLenar Datos', 'Horarios Disponibles', 'Detalles Agendamiento'];

function getStepContent(step, especialidad, especialista, espe, especia, setEspe, setEspecia, rut, setRut, disponibilidad, setDisponibilidad, idDispo, setDispo, fecha, setFecha,hora,setHora) {
    
    switch (step) {
        case 0:
            return <AddressForm especialidad={especialidad} especialista={especialista} espe={espe} especia={especia} setEspe={setEspe} setEspecia={setEspecia} rut ={rut} setRut= {setRut} />;
        case 1:
            return <PaymentForm especia={especia} rut = {rut} disponibilidad={disponibilidad} setDisponibilidad={setDisponibilidad} setDispo={setDispo} setFecha={setFecha} setHora={setHora}/>;
        case 2:
            return <Review hora ={ hora} fecha={fecha} especialidad={especialidad} especialista={especialista} espe={espe} especia={especia}/>;
        default:
            throw new Error('Unknown step');

            
    }
}

const theme = createTheme();

export default function Checkout() {

    const [activeStep, setActiveStep] = React.useState(0);
  
    const [especialidad, setEspecialidad] = useState([])
    const [especialista, setEspecialista] = useState([])
    const [disponibilidad, setDisponibilidad] = useState([])
    const [espe, setEspe] = useState("")//Id especialidad
    const [especia, setEspecia] = useState("")//Id especialista
    const [rut,setRut] = useState("")
    const [idDispo, setDispo] = useState("")//Id disponibilidad
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")

    useEffect(() => {

        getEspecialidad()

    }, [])

    useEffect(() => {

        getEspecialista()

    }, [])

    async function getEspecialidad() {
        try {
            const response = await axios.get('/api/especialidad');
            if (response.status === 200) {
                
                setEspecialidad(response.data.especialidad);
                

            }
        } catch (error) {

            console.error(error);
        }
    }

    async function getEspecialista() {
        try {
            const response = await axios.get('/api/especialista');
            if (response.status === 200) {
                
                response.data.especialidadconEspecialista.map((especiali) => {

                    let nuevo = {
                        id_especialidad: especiali.especialidad._id,
                        id_especialista: especiali._id,
                        nombre:especiali.nombre
            
                    }
                    setEspecialista(especialista =>[...especialista ,nuevo]);
                })

            }
        } catch (error) {

            console.error(error);
        }
    }

    function guardarAgendamiento()  
    {   

        console.log("paso aquí");
        axios.post('/api/agendamiento', {    
            rut:rut,
            idDisponibilidad:idDispo,
            idEspecialista:especia
        })
        .then(function (response) {

                if(response.status===200)
                {
                    
                    alert("guardado")

                }else{
                    alert("Error al guardar")
                }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    const handleNext = () => {
        
        if((activeStep + 1) === 1){

            if(revisarCampos() === true){
 
                if(Fn.validaRut(rut) === true){

                    setActiveStep(activeStep + 1);
                    
                }
                else{
                    alert("Rut invalido")
                }

                
            }else{

                alert("Debe completar los campos")

            }
            
        }

        if((activeStep + 1) === 2){

            if( confirmarHora() === true){

                setActiveStep(activeStep + 1);

            }else{

                alert("Seleccione un horario")

            }
            
        }

        if((activeStep + 1) === 3){

            guardarAgendamiento();
            setActiveStep(activeStep + 1);

        }

    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const revisarCampos =() => {

        if(rut==="" || espe === "" || especia === ""){

            return false

        }else{

            return true
        }

    }

    const confirmarHora = () =>{

        if(idDispo === ""){

            return false

        }else{

            return true

        }

    }

    var Fn = {
            // Valida el rut con su cadena completa "XXXXXXXX-X"
            validaRut : function (rutCompleto) {
                if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
                    return false;
                var tmp 	= rutCompleto.split('-');
                var digv	= tmp[1]; 
                var rut 	= tmp[0];
                if ( digv == 'K' ) digv = 'k' ;
                return (Fn.dv(rut) == digv );
            },
            dv : function(T){
                var M=0,S=1;
                for(;T;T=Math.floor(T/10))
                    S=(S+T%10*(9-M++%6))%11;
                return S?S-1:'k';
            }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="primary" noWrap>
                        Company name
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Su hora a sido agendada
                                </Typography>
                                <Typography variant="subtitle1">
                                    Gracias por preferirnos
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep,especialidad, especialista, espe,especia, setEspe, setEspecia, rut, setRut, disponibilidad, setDisponibilidad,idDispo,setDispo,fecha, setFecha,hora,setHora)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button variant="contained" color="secondary" onClick={handleBack} sx={{ mt: 3, ml: 1 }} >
                                            Atrás
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}