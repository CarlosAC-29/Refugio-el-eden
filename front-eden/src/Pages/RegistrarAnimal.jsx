import { React, useState } from 'react'
import { 
  Button, 
  Container, 
  Grid, 
  Stack, 
  TextField, 
  Typography, 
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText

  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useFormik } from 'formik';

import MenuArriba from '../Components/MenuArriba';

import { createAnimal } from '../Functions/SqlFunctions';

import ButtonBack from '../Components/ButtonBack';

import '../styles/RegistrarUsu.css';


export default function RegistarAnimal() {

  const validacion = (values) => {
    const errors = {};
    if (!values.Nombre) {
      errors.Nombre = 'Campo obligatorio';
    }
    if (!values.Tipo) {
      errors.Tipo = 'Campo obligatorio';
    }
    if (!values.Edad) {
      errors.Edad = 'Campo obligatorio';
    }
    if (!values.MotivoI) {
      errors.MotivoI = 'Campo obligatorio';
    }
    if (!values.FechaI) {
      errors.FechaI = 'Campo obligatorio';
    }
    if (!values.Observaciones) {
      errors.Observaciones = 'Campo obligatorio';
    }
    if (!values.Talla) {
      errors.Talla = 'Campo obligatorio';
    }
    if (!values.Estado) {
      errors.Estado = 'Campo obligatorio';
    }

    return errors;
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Nombre: '',
      Tipo: '',
      Edad: '',
      MotivoI: '',
      FechaI: '',
      FechaS: '',
      Observaciones: '',
      Talla: '',
      Estado: ''
    },
    validate: validacion,
    onSubmit: (values) => {
      let animalData = JSON.stringify(values, null, 2)
       const nombre = JSON.parse(animalData).Nombre
       const tipo = JSON.parse(animalData).Tipo
       const talla = JSON.parse(animalData).Talla
       const edad = JSON.parse(animalData).Edad
       const motivoIngreso = JSON.parse(animalData).MotivoI
       const observaciones = JSON.parse(animalData).Observaciones
       const estado = JSON.parse(animalData).Estado
       const fechaI = JSON.parse(animalData).FechaI
       const fechaS = JSON.parse(animalData).FechaS
        createAnimal(nombre, talla, edad, tipo, motivoIngreso, observaciones, estado, fechaI, fechaS);
        //createAnimal('008', 'pija', 'M', '5', 'gay', 'porgay', 'ninguna', 'S', '2022-08-18T05:00:00.000Z', '2022-08-20T05:00:00.000Z');
    }
  });


  return (
    <div className='RegistrarUsuCont'>
      <MenuArriba />
      <ButtonBack/>
      <Box sx={{
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '45%',
          xl: '45%'
        },
        backgroundColor: 'rgba(226, 226, 226, 0.95)',
        paddingTop: 2,
        borderRadius: '15px',
        flexDirection: "column",
        alignContent: "right",
        marginLeft: {
          xs: 0,
          sm: 0,
          md: 0,
          lg: 20,
          xl: 20
        }

      }}>
        <Stack
          spacing={2}
          justifyContent="center"
          direction={'column'}
          alignItems={'center'}
          sx={{ paddingBottom: 4}}>
          <Typography alignSelf={'center'} variant='h1' color={'#881600'}>Registrar nuevo animal</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={6}>
              <Grid item xs={12} md={4}>
                <Container>
                  <TextField fullWidth id="Nombre" label="Nombre" variant="filled" name='Nombre'
                   value={formik.values.Nombre} onChange={formik.handleChange} 
                   error={formik.touched.Nombre && Boolean(formik.errors.Nombre)} 
                   helperText= {formik.touched.Nombre && formik.errors.Nombre}/>
                </Container>
              </Grid>
              <Grid item xs={12} md={4}>
                <Container>
                  <TextField fullWidth id="Tipo" label="Tipo" variant="filled" name='Tipo' 
                  value={formik.values.Tipo} onChange={formik.handleChange} 
                  error={formik.touched.Tipo && Boolean(formik.errors.Tipo)} 
                   helperText= {formik.touched.Tipo && formik.errors.Tipo}/>
                </Container>
              </Grid>
              <Grid item xs={12} md={4}>
                <Container>
                  <TextField fullWidth id="Edad" label="Edad" variant="filled" name='Edad'
                   value={formik.values.Edad} onChange={formik.handleChange} 
                   error={formik.touched.Edad && Boolean(formik.errors.Edad)} 
                   helperText= {formik.touched.Edad && formik.errors.Edad}/>
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      id="Calendario I"
                      label="Fecha de ingreso"
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.FechaI}
                      onChange={(val) => {
                        formik.setFieldValue("FechaI", val);
                      }}
                      renderInput={(params) =>
                        <TextField
                          fullWidth
                          name='FechaI'
                          id="FechaI"
                          label="Fecha Ingreso"
                          inputVariant="filled"
                          format="MM/dd/yyyy"
                          {...params}
                           />}
                    />
                  </LocalizationProvider>
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      id= "Calendario S"
                      label="Fecha de salida"
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.FechaS}
                      error={formik.touched.FechaS && Boolean(formik.errors.FechaS)} 
                      helperText= {formik.touched.FechaS && formik.errors.FechaS}
                      onChange={(val) => {
                        formik.setFieldValue("FechaS", val);
                      }}
                      renderInput={(params) =>
                        <TextField
                          fullWidth
                          name='FechaS'
                          id="FechaS"
                          label="Fecha Salida"
                          inputVariant="filled"
                          format="MM/dd/yyyy"
                          {...params}
                          />}
                    />
                  </LocalizationProvider>
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                <FormControl required fullWidth variant="filled" sx={{ backgroundColor: 'rgba(226, 226, 226, 0.95)' }}>
                  <InputLabel id="demo-simple-select-filled-label">Motivo Ingreso</InputLabel>
                  <Select
                   labelId="MotivoI"
                   id="MotivoI"
                   name='MotivoI'
                   value={formik.values.MotivoI}
                    label="MotivoI"
                    onChange={formik.handleChange}
                    error={formik.touched.MotivoI && Boolean(formik.errors.MotivoI)} 
                  >
                    <MenuItem sx={{ borderRadius: 0}} value={"Albergue"}>Albergue</MenuItem>
                    <MenuItem sx={{ borderRadius: 0}} value={"Rescate"}>Rescate</MenuItem>

                  </Select>
                </FormControl>
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                  <TextField sx={{ minHeight: 6 }} fullWidth id="Observaciones"
                   label="Observaciones" variant="filled" name='Observaciones'
                    value={formik.values.Observaciones} onChange={formik.handleChange}
                    error={formik.touched.Observaciones && Boolean(formik.errors.Observaciones)} 
                   helperText= {formik.touched.Observaciones && formik.errors.Observaciones} />
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                <FormControl required fullWidth variant="filled" sx={{ backgroundColor: 'rgba(226, 226, 226, 0.95)' }}>
                  <InputLabel id="demo-simple-select-filled-label">Talla</InputLabel>
                  <Select
                   labelId="Talla"
                   id="Talla"
                   name='Talla'
                   value={formik.values.Talla}
                    label="Talla"
                    onChange={formik.handleChange}
                  >
                    <MenuItem sx={{ borderRadius: 0}} value={"P"}>Pequeño</MenuItem>
                    <MenuItem sx={{ borderRadius: 0}} value={"M"}>Mediano</MenuItem>
                    <MenuItem sx={{ borderRadius: 0}} value={"G"}>Grande</MenuItem>

                  </Select>
                </FormControl>
                </Container>
              </Grid>
              <Grid item xs={12} md={6}>
                <Container>
                <FormControl required fullWidth variant="filled" sx={{ backgroundColor: 'rgba(226, 226, 226, 0.95)' }}>
                  <InputLabel id="demo-simple-select-filled-label">Estado</InputLabel>
                  <Select
                   labelId="Estado"
                   id="Estado"
                   name='Estado'
                   value={formik.values.Estado}
                    label="Estado"
                    onChange={formik.handleChange}
                  >
                    <MenuItem sx={{ borderRadius: 0}} value={"S"}>Sano</MenuItem>
                    <MenuItem sx={{ borderRadius: 0}} value={"E"}>Enfermo</MenuItem>

                  </Select>
                </FormControl>
                </Container>
              </Grid>
            </Grid>
            <Stack direction={'row'} spacing={4} justifyContent={'space-between'} sx={{ paddingTop: 7 }}>
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
                  sx={{ border: '3px solid #881600', borderRadius: 10, ':hover': { border: '3px solid #881600' } }}
                  variant='outlined'
                  size='medium'
                  fullWidth
                  type='submit'
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

