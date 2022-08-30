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
  Grid
} from '@mui/material';
import PagosTable from '../Components/DataTablePagos';

import ButtonBack from '../Components/ButtonBack';

import { useFormik } from 'formik';

import { getVoluntarios, busquedas, getPagos } from '../Functions/SqlFunctions';

import '../styles/BuscarAnimal.css';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: '#EAE0D5',
  borderRadius: 0,

  '&: hover': {
    backgroundColor: '#93493A'
  }
}));




export default function BuscarPago() {

  const [pagos, setPagos] = useState([]);
  const [Tipo, setTipo] = React.useState('');


  const handleChange = (event) => {
    setTipo(event.target.value);
  }

  const todosDatos = async () => {
    console.log("Pagos")
    await getPagos();
    setPagos(busquedas)
    console.log("Lospagos tan aca"+pagos)
  }

  useEffect(() => {
    todosDatos();
  }, [])

  return (
    <div className='FullCont'>
      <MenuArriba />
      <ButtonBack />
      <div className='contenedor-buscar-animal'>   
        <div className='tabla-container'>
          <PagosTable datosBd={pagos}/>
        </div>
      </div>
    </div>
  )
}
