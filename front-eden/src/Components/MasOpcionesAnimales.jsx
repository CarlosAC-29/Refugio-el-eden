import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { 
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getAnimal } from '../Functions/UtilityF';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';

import {
    IconButton,
    Tooltip,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../styles/MasOpciones.css';
import ClearIcon from '@mui/icons-material/Clear';
import { borrarAnimal, actualizarAnimal, getAllAnimales, busquedas } from '../Functions/SqlFunctions'

export default function MasOpcionesAnimales({ row, reload }) {

  const navigate = useNavigate();

    const [fechaSa, setFechaSal]=useState(row.fecha_salida);
    const [fechaIn, setFechaIn]=useState(row.fecha_ingreso);

    function registrarPago() {
        getAnimal(row)
        navigate('/Registro-Pago');
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const eliminarReg = async() => {
      await borrarAnimal(row.id_animal);
      await getAllAnimales();
            reload(busquedas);
            setOpen(false);
    }

    const formik = useFormik({
        initialValues: {
          Id: row.id_animal,  
          Nombre: row.nombre_animal,
          Tipo: row.tipo,
          Edad: row.edad,
          MotivoI: row.motivo_ingreso,
          FechaI: fechaIn,
          FechaS: fechaSa,
          Observaciones: row.observaciones,
          Talla: row.talla,
          Estado: row.estado,
        },
        onSubmit: async (values) => {
          let animalData = JSON.stringify(values, null, 2)
            const id_animal = JSON.parse(animalData).Id;
            const nombre_animal = JSON.parse(animalData).Nombre;
            const talla = JSON.parse(animalData).Talla;
            const edad = JSON.parse(animalData).Edad;
            const tipo = JSON.parse(animalData).Tipo;
            const motivo_ingreso = JSON.parse(animalData).MotivoI;
            const observaciones = JSON.parse(animalData).Observaciones;
            const estado = JSON.parse(animalData).Estado;
            const fecha_ingreso = JSON.parse(animalData).FechaI;
            const fecha_salida = JSON.parse(animalData).FechaS;
           await actualizarAnimal(id_animal,
                nombre_animal,
                talla,
                edad,
                tipo,
                motivo_ingreso,
                observaciones,
                estado,
                fecha_ingreso,
                fecha_salida);

            await getAllAnimales();
            reload(busquedas);
            setOpen(false);
        }
      });

    return (
        <div>
            <IconButton variant="outlined" onClick={handleClickOpen}>
                <Tooltip title="Mas Opciones">
                    <MoreHorizIcon />
                </Tooltip>
            </IconButton>
            <Dialog open={open} onClose={handleClose} >
            <form onSubmit={formik.handleSubmit}>
                <div className='Contenedor-Titulo'>
                    <Button variant="text" onClick={handleClose} endIcon={<ClearIcon />}>Cancelar</Button>
                </div>
                <DialogContent sx={{ backgroundColor: '#EAE0D5' }}>
                    <TextField margin="dense" name="Id" id="Id" label="id" fullWidth variant="standard" value={formik.values.Id} onChange={formik.handleChange}/>
                    <TextField margin="dense" name="Nombre" id="Nombre" label="Nombre" fullWidth variant="standard" value={formik.values.Nombre} onChange={formik.handleChange}/>
                    <TextField margin="dense" name="Talla" id="Talla" label="Talla" fullWidth variant="standard"  value={formik.values.Talla} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Tipo" id="Tipo" label="Especie" fullWidth variant="standard"  value={formik.values.Tipo} onChange={formik.handleChange}/>
                    <TextField margin="dense" name="MotivoI" id="MotivoI" label="Motivo de ingreso" fullWidth variant="standard"   value={formik.values.MotivoI} onChange={formik.handleChange}/>
                    <TextField margin="dense" name="Edad" id="Edad" label="Edad" fullWidth variant="standard" value={formik.values.Edad} onChange={formik.handleChange}/>
                    
                    <Stack spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      id= "Calendario S"
                      label="Fecha Ingreso"
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.FechaI}
                      defaultValue={row.fecha_ingreso}
                      onChange={(val) => {
                        formik.setFieldValue("FechaI", val);
                      }}
                      renderInput={(params) =>
                        <TextField
                          fullWidth
                          name='FechaS'
                          id="FechaI"
                          label="FechaI"
                          inputVariant="filled"
                          format="MM/dd/yyyy"
                          {...params} />}
                    />
                            
                  </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      id= "Calendario S"
                      label="Fecha salida"
                      inputFormat="MM/dd/yyyy"
                      value={formik.values.FechaS}
                      defaultValue={row.fecha_ingreso}
                      onChange={(val) => {
                        formik.setFieldValue("FechaS", val);
                      }}
                      renderInput={(params) =>
                        <TextField
                          fullWidth
                          name='FechaS'
                          id="FechaS"
                          label="fechaSalida"
                          inputVariant="filled"
                          format="MM/dd/yyyy"
                          {...params} />}
                    /> 
                    </LocalizationProvider>

                    </Stack>

                    <TextField margin="dense" name="Observaciones" id="Observaciones" label="observacion" fullWidth variant="standard"  value={formik.values.Observaciones} onChange={formik.handleChange}/>
                   
                   
                    <FormControl fullWidth variant="filled">
                       <InputLabel id="demo-simple-select-filled-label">Estado</InputLabel>
                        <Select
                          labelId="Estado"
                          id="Estado"
                          name='Estado'
                          value={formik.values.Estado}
                          label="Talla"
                          onChange={formik.handleChange}
                        >
                          <MenuItem sx={{ borderRadius: 0}} value={"S"}>Sano</MenuItem>
                          <MenuItem sx={{ borderRadius: 0}} value={"E"}>Enfermo</MenuItem>

                        </Select>
                    </FormControl>
                
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#EAE0D5', justifyContent: "space-between" }}>
                    <Button variant="contained" onClick={eliminarReg} endIcon={<DeleteIcon />} >Eliminar Registro</Button>
                    <Button variant="contained" type='submit' onClick={handleClose} endIcon={<SaveAsIcon />} >Guardar</Button>
                    <Button variant="contained" endIcon={<AttachMoneyIcon />} onClick={registrarPago} >Seleccionar</Button>
                </DialogActions>
             </form>               
            </Dialog> 
        </div>
    );
}
