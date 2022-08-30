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
import { clienteNombre, clienteCedula, getCliente } from '../Functions/UtilityF';
import { useFormik } from 'formik';
import {
    IconButton,
    Tooltip,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../styles/MasOpciones.css';
import ClearIcon from '@mui/icons-material/Clear';
import { borrarPatrocinador, actualizarPatrocinador, getAllPatrocinadores, busquedas, /**borrarCliente */  } from '../Functions/SqlFunctions'


export default function MasOpcionesCliente({row, reload}) {


     function registrarPago() {
        getCliente(row)
        navigate('/Registro-Pago');
    };

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const eliminarReg = async() => {
        await borrarPatrocinador(row.cedula);
        await getAllPatrocinadores();
                reload(busquedas);
                setOpen(false);

    }
    
    const formik = useFormik({
        initialValues: {
          Cedula: row.cedula,  
          Nombre: row.nombre,
          Apellido: row.apellido,
          Correo: row.correo,
          TipoVia: row.tipo_via,
          Calle: row.numero_calle,
          Casa: row.numero_casa,
          Telefono: row.telefono,
        },
        onSubmit: async(values) => {
            let clienteData = JSON.stringify(values, null, 2);
              const cedula = JSON.parse(clienteData).Cedula;
              const nombre = JSON.parse(clienteData).Nombre;
              const apellido = JSON.parse(clienteData).Apellido;
              const correo = JSON.parse(clienteData).Correo;
              const tipo_via = JSON.parse(clienteData).TipoVia;
              const numero_calle = JSON.parse(clienteData).Calle;
              const numero_casa = JSON.parse(clienteData).Casa;    
              const telefono = JSON.parse(clienteData).Telefono;

              await actualizarPatrocinador(cedula,
                nombre,
                apellido,
                correo,
                tipo_via,
                numero_calle,
                numero_casa,
                telefono
                );
                await getAllPatrocinadores();
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
                    <TextField margin="dense" name="Cedula" id="Cedula" label="Cédula" fullWidth variant="standard" value={formik.values.Cedula} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Nombre" id="Nombre" label="Nombre" fullWidth variant="standard" value={formik.values.Nombre} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Apellido" id="Apellido" label="Apellido" fullWidth variant="standard" value={formik.values.Apellido} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Correo" id="Correo" label="Correo electrónico" fullWidth variant="standard" value={formik.values.Correo} onChange={formik.handleChange} />
                    <TextField margin="dense" name="TipoVia" id="TipoVia" label="Tipo de vía" fullWidth variant="standard" value={formik.values.TipoVia} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Calle" id="Calle" label="Número de calle" fullWidth variant="standard" value={formik.values.Calle} onChange={formik.handleChange}/>
                    <TextField margin="dense" name="Casa" id="Casa" label="Número de casa" fullWidth variant="standard" value={formik.values.Casa} onChange={formik.handleChange} />
                    <TextField margin="dense" name="Telefono" id="Telefono" label="Teléfono" fullWidth variant="standard" value={formik.values.Telefono} onChange={formik.handleChange} />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#EAE0D5', justifyContent: "space-between" }}>
                    <Button variant="contained" onClick={eliminarReg} endIcon={<DeleteIcon />} >Eliminar Registro</Button>
                    <Button variant="contained" type='submit' onClick={handleClose} endIcon={<SaveAsIcon />} >Guardar</Button>
                    <Button variant="contained" onClick={registrarPago} endIcon={<AttachMoneyIcon />} >Registrar Pago</Button>
                </DialogActions>
                </form>
            </Dialog> 
        </div>
    );
}
