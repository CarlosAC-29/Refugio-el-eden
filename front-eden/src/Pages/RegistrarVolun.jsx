import React from 'react'
import { Button, Container, Grid, Stack, TextField, Typography, Box, container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import MenuArriba from '../Components/MenuArriba';

import ButtonBack from '../Components/ButtonBack';

import { createVoluntario } from '../Functions/SqlFunctions';

import '../styles/RegistrarUsu.css';


export default function RegistrarVolun() {

  const validacion = (values) => {
    const errors = {};

    if (!values.Nombre) {
      errors.Nombre = 'Campo obligatorio*';
    }
    if (!values.Cedula) {
      errors.Cedula = 'Campo obligatorio*';
    }
    if (!values.Cargo) {
      errors.Cargo = 'Campo obligatorio*';
    }
    if (!values.Telefono) {
      errors.Telefono = 'Campo obligatorio*';
    }
    if (!values.UsserName) {
      errors.UsserName = 'Campo obligatorio*';
    }
    if (!values.Password) {
      errors.Password = 'Campo obligatorio*';
    }
    return errors;
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Nombre: '',
      Cedula: '',
      Cargo: '',
      Telefono: '',
      UsserName: '',
      Password: '',

    },
    validate: validacion,
    onSubmit: (values) => {
      let volunteerData = JSON.stringify(values, null, 2)
      const nombre = JSON.parse(volunteerData).Nombre
      const cedula = JSON.parse(volunteerData).Cedula
      const cargo = JSON.parse(volunteerData).Cargo
      const telefono = JSON.parse(volunteerData).Telefono
      const usuario = JSON.parse(volunteerData).UsserName
      const contrasena = JSON.parse(volunteerData).Password

      /* createAnimal('008', nombre, talla, edad, tipo, motivoIngreso, observaciones, estado, fechaI, fechaS);*/
      createVoluntario(nombre, cedula, cargo, telefono, usuario, contrasena);
      //createPatrocinador('59485217', 'Carlos', 'Carloscaceres', 'carlitos@carlitos.com','3156421563', 'larga', 'primer', '56-56','albergue');
    }
  });

  return (

    <div className='RegistrarUsuCont'>
 
        <MenuArriba />
    
        <ButtonBack />
        <Box sx={{
          width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: '45%',
            xl: '45%'
          },
          backgroundColor: 'rgba(226, 226, 226, 0.95)',
          paddingTop: 5,
          borderRadius: '15px',
          alignContent: "right",

          marginLeft: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 20,
            xl: 20
          }

        }}>
          <Stack spacing={3}
            justifyContent="center"
          >
            <Typography alignSelf={'center'} variant='h1' color={'#881600'}>Registrar Voluntario</Typography>
            <form onSubmit={formik.handleSubmit}>
              <Stack
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Container>
                  <TextField fullWidth id="Nombre" label="Nombre" variant="filled"
                    name='Nombre' value={formik.values.Nombre} onChange={formik.handleChange}
                    error={formik.touched.Nombre && Boolean(formik.errors.Nombre)}
                    helperText={formik.touched.Nombre && formik.errors.Nombre} />
                </Container>

                <Container>
                  <TextField fullWidth id="Cedula" label="Cedula" variant="filled"
                    name='Cedula' value={formik.values.Cedula} onChange={formik.handleChange}
                    error={formik.touched.Cedula && Boolean(formik.errors.Cedula)}
                    helperText={formik.touched.Cedula && formik.errors.Cedula} />
                </Container>


                <Container>
                  <TextField fullWidth id="Cargo" label="Cargo" variant="filled"
                    name='Cargo' value={formik.values.Cargo} onChange={formik.handleChange}
                    error={formik.touched.Cargo && Boolean(formik.errors.Cargo)}
                    helperText={formik.touched.Cargo && formik.errors.Cargo} />
                </Container>

                <Container>
                  <TextField fullWidth id="Telefono" label="Télefono" variant="filled"
                    name='Telefono' value={formik.values.Telefono} onChange={formik.handleChange}
                    error={formik.touched.Telefono && Boolean(formik.errors.Telefono)}
                    helperText={formik.touched.Telefono && formik.errors.Telefono} />
                </Container>


                <Stack spacing={4}
                  direction='row'
                  justifyContent="center"
                >
                  <TextField fullWidth id="UsserName" label="Nombre de usuario" variant="filled"
                    name='UsserName' value={formik.values.UsserName} onChange={formik.handleChange}
                    error={formik.touched.UsserName && Boolean(formik.errors.UsserName)}
                    helperText={formik.touched.UsserName && formik.errors.UsserName} />

                  <TextField fullWidth id="Password" label="Contraseña" type="password" variant="filled"
                    name='Password' value={formik.values.Password} onChange={formik.handleChange}
                    error={formik.touched.Password && Boolean(formik.errors.Password)}
                    helperText={formik.touched.Password && formik.errors.Password} />
                </Stack>
              </Stack>
              <Stack direction={'row'} spacing={6} justifyContent={'space-between'} sx={{ padding: 5 }}>
                <Container>
                  <Button
                    variant="outlined"
                    size='medium'
                    fullWidth
                    onClick={() => { navigate('/') }}
                    sx={{ border: '3px solid #881600', borderRadius: 10, ':hover': { border: '3px solid #881600' } }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 20,
                          sm: 20,
                          md: 30,
                          lg: 30,
                          xl: 30
                        }
                      }}
                      color={'#881600'}
                    >
                      Cancelar
                    </Typography>
                  </Button>
                </Container>
                <Container>
                  <Button
                    variant="outlined"
                    size='medium'
                    fullWidth
                    type='submit'
                    sx={{ border: '3px solid #881600', borderRadius: 10, ':hover': { border: '3px solid #881600' } }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 20,
                          sm: 20,
                          md: 30,
                          lg: 30,
                          xl: 30
                        }
                      }}
                      color={'#881600'}
                    >
                      Guardar
                    </Typography>
                  </Button>
                </Container>
              </Stack>
            </form>
          </Stack>
        </Box>

    </div>
  )
}
