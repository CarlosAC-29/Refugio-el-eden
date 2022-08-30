import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useFormik } from 'formik';
import {
    IconButton,
    Tooltip,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../styles/MasOpciones.css';
import ClearIcon from '@mui/icons-material/Clear';
import { borrarVoluntario, actualizarVoluntario, getAllVoluntarios, busquedas, /**borrarVoluntario */ } from '../Functions/SqlFunctions'


export default function MasOpcionesVoluntarios({row, reload}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const eliminarReg = async() => {
        await borrarVoluntario(row.cedula);
        await getAllVoluntarios();
             reload(busquedas);
             setOpen(false);
    }

    const formik = useFormik({
        initialValues: {
            Cedula: row.cedula,
            Nombre: row.nombre,
            Telefono: row.telefono,
            Cargo: row.cargo,
            UsserName: row.username,
            Password: row.password
    },
    onSubmit: async (values) => {
        let voluntarioData = JSON.stringify(values, null, 2);
          const cedula = JSON.parse(voluntarioData).Cedula;
          const nombre = JSON.parse(voluntarioData).Nombre;
          const apellido_voluntario = JSON.parse(voluntarioData).Apellido;
          const telefono = JSON.parse(voluntarioData).Telefono;
          const cargo = JSON.parse(voluntarioData).Cargo;
          const username = JSON.parse(voluntarioData).UsserName;
          const password = JSON.parse(voluntarioData).Password;
          actualizarVoluntario(nombre,
            cedula,
            cargo,
            telefono,
            username,
            password
            );
            await getAllVoluntarios();
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
                    <TextField margin="dense" name="Cedula" id="Cedula" label="Cedula" fullWidth variant="standard" value={formik.values.Cedula} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Nombre" id="Nombre" label="Nombre" fullWidth variant="standard" value={formik.values.Nombre} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Telefono" id="Telefono" label="Numero telefonico" fullWidth variant="standard" value={formik.values.Telefono} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Cargo" id="Cargo" label="Cargo" fullWidth variant="standard" value={formik.values.Cargo} onChange={formik.handleChange} />
                    <TextField margin="dense" name="UsserName" id="UsserName" label="Nombre de usuario" fullWidth variant="standard" value={formik.values.UsserName} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Password" id="Password" label="Contraseña" fullWidth variant="standard" value={formik.values.Password} onChange={formik.handleChange} />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#EAE0D5', justifyContent: "space-between" }}>
                    <Button variant="contained" onClick={eliminarReg} endIcon={<DeleteIcon />} >Eliminar Registro</Button>
                    <Button variant="contained" type='submit' onClick={handleClose} endIcon={<SaveAsIcon />} >Guardar</Button>
                </DialogActions>
                </form>
            </Dialog> 
        </div>
    );
}
