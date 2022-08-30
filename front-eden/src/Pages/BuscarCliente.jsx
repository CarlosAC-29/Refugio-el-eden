import React, { useEffect, useState } from 'react'
import MenuArriba from '../Components/MenuArriba';
import {
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  styled,
  Button,
  Grid,
  Typography
} from '@mui/material';

import DataTable from '../Components/DataTableClientes';

import ButtonBack from '../Components/ButtonBack';

import { useFormik } from 'formik';

import { getPatrocinadores, busquedas, getAllPatrocinadores } from '../Functions/SqlFunctions';

import '../styles/BuscarAnimal.css';
//import { getPatrocinador } from '../../../back-eden/dbConnection';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: '#EAE0D5',
  borderRadius: 0,

  '&: hover': {
    backgroundColor: '#93493A'
  }
}));




export default function BuscarCliente() {

  const [patro, setPatro] = useState([]);

  const formik = useFormik({
    initialValues: {
      TipoDato: '',
      Dato: '',
    },
    onSubmit: async (values) => {
      let userData = JSON.stringify(values, null, 2)
      const tipoBusqueda = JSON.parse(userData).TipoDato;
      const dato = JSON.parse(userData).Dato
      await getPatrocinadores(tipoBusqueda, dato);
      console.log(busquedas);
      setPatro(busquedas)
    }

  });


  const [Tipo, setTipo] = React.useState('');

  const handleChange = (event) => {
    setTipo(event.target.value);
  }
  const todosDatos = async () => {
    await getAllPatrocinadores();
    setPatro(busquedas)
  }

  useEffect(() => {
    todosDatos();
  }, [])

  return (
    <div className='FullCont'>
      <MenuArriba />
      <ButtonBack />
      <div className='contenedor-buscar-animal'>
        <div className='buscar-contenedor'>

          <form onSubmit={formik.handleSubmit}>
            <Stack
              direction='row'
              spacing={2}
            >
              <Grid container>
                <Grid item md={5}>
                  <FormControl variant="filled" sx={{ width: {xs: '13rem', sm :'13rem',md:'95%'}, backgroundColor: 'rgba(226, 226, 226, 0.95)' }}>
                    <InputLabel id="Tipobusqueda">Tipo de busqueda</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.TipoDato}
                      label="Age"
                      name="TipoDato"
                      onChange={formik.handleChange}
                      sx={{width: {xs: '13rem', sm :'13rem',md:'100%'}, backgroundColor: 'rgba(226, 226, 226, 0.95)', ":hover": { backgroundColor: 'rgba(226, 226, 226, 0.95)' } }}
                    >
                      <StyledMenuItem value={"Identificador"}>Identificador</StyledMenuItem>
                      <StyledMenuItem value={"Nombre"}>Nombre</StyledMenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={5}>
                  <TextField
                    name="Dato"
                    id="TextoBusqueda"
                    variant="filled"
                    label="Busqueda..."
                    value={formik.values.Dato}
                    onChange={formik.handleChange}
                    sx={{
                      backgroundColor: 'rgba(226, 226, 226, 0.95)',
                      width: '80%'
                    }} />
                </Grid>
                <Grid item md={2} sx={{justifyContent: 'left'}}>
                  <Button 
                  variant='contained' 
                  type='submit'> 
                  <Typography fontSize={25}>Buscar</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </form>
        </div>
        <div className='tabla-container'>
          <DataTable datosBd={patro} reload={setPatro} />
        </div>
      </div>
    </div>
  )
}
