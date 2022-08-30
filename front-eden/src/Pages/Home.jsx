import React, { useEffect, useState } from 'react'
import '../styles/Home.css';
import {
  Stack, Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  MenuItem,
  useTheme,
  styled,
  IconButton,
  useMediaQuery,
  Box,
  Button
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PetsIcon from '@mui/icons-material/Pets';
import StoreIcon from '@mui/icons-material/Store';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import iconoOso from '../Images/IconoOso.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddIcon from '@mui/icons-material/Add';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { user, getVoluntarios, idVoluntario } from '../Functions/SqlFunctions';


const StyledAcordion = styled(Accordion)(({ theme }) => ({

  width: '30rem',
  [theme.breakpoints.down('md')]: {
    width: '25rem'
  },
  [theme.breakpoints.down('1100')]: {
    width: '20rem'
  },
  [theme.breakpoints.down('sm')]: {
    width: '17rem'
  },

}));

const StyledBox = styled(Box)(({ theme }) => ({

  width: '45%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  },

}));

function Home() {
  const [esAdimin, setEsAdmin]=useState(true);
  const [nombree, setNombree]=useState("Administrador");
  
  const navigate = useNavigate();
  const theme = useTheme();
  const match = useMediaQuery('(min-height: 900px)');
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

    const voluntario = async () => {
      console.log("Este es mi id"+idVoluntario);
        await getVoluntarios("Identificador", idVoluntario, true);
        console.log(user)
    if(user[0].cargo == "Administrador"){
        setEsAdmin(true);
    }else{
        setEsAdmin(false);
    }
    setNombree(user[0].nombre);
    }

    voluntario();

  return (
    <div className='Contenedor-principal'>
          <Box
          sx={{
             width: {
              xs: '100%',
              sm: '100%',
              md: '100%',
              lg: '45%',
              xl: '45%'
            },
             backgroundColor:'rgba(226, 226, 226, 0.8)',
             height:'100%',
          }}
          >
            {esAdimin ?
          <Stack
            spacing={match? 3 : 1}
            direction={'column'}
            alignItems={'center'}
            sx={match? { padding: 13 } :{ padding: 4 }}
          >  
            <img className='Icono-main' src={iconoOso} />
            <Typography sx={{ fontSize: '1.5rem', color: '#d84707', fontWeight: 3 }} >{"Bienvenido, Administrador"}</Typography>
            <StyledAcordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                <PersonIcon sx={{ fontSize: '2.2rem' }} />
                <Typography sx={{fontSize: '1.7rem'}}>Clientes</Typography>
              </AccordionSummary>
              <AccordionDetails>

                <MenuItem onClick={() => navigate('/Registro-Usuario')} >
                  <ChevronRightIcon fontSize='1.4rem' />Registrar nuevo cliente
                </MenuItem>
                <MenuItem onClick={() => navigate('/Buscar-Cliente')}>
                  <ChevronRightIcon fontSize='1.4rem' />Buscar cliente
                </MenuItem>

              </AccordionDetails>
            </StyledAcordion>

            <StyledAcordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                <HandshakeIcon sx={{ fontSize: '2.2rem' }} />
                <Typography sx={{fontSize: '1.7rem'}}>Voluntarios</Typography>
              </AccordionSummary>
              <AccordionDetails>

                <MenuItem onClick={() => navigate('/Registro-Voluntario')} disabled={false}><ChevronRightIcon fontSize='1.5rem' />Añadir nuevo voluntario</MenuItem>
                <MenuItem onClick={() => navigate('/Buscar-Voluntario')}><ChevronRightIcon fontSize='1.5rem' />Buscar voluntario</MenuItem>

              </AccordionDetails>
            </StyledAcordion>

            <StyledAcordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                <PetsIcon sx={{ fontSize: '2.2rem' }} />
                <Typography sx={{ fontSize: '1.7rem' }}>Animales</Typography>
              </AccordionSummary>
              <AccordionDetails>

                <MenuItem onClick={() => navigate('/Registro-Animal')}>
                  <ChevronRightIcon fontSize='1.5rem' />Registrar nuevo animal
                </MenuItem>
                <MenuItem onClick={() => navigate('/Buscar-Animal')}>
                  <ChevronRightIcon fontSize='1.5rem' />Buscar animal
                </MenuItem>
              </AccordionDetails>

            </StyledAcordion>

            <StyledAcordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary aria-controls="panel4d-content" id="panel4d-header" expandIcon={<ExpandMoreIcon />}>
                <StoreIcon sx={{ fontSize: '2.2rem' }} />
                <Typography sx={{ fontSize: '1.7rem' }}>Caja</Typography>
              </AccordionSummary>
              <AccordionDetails>

                <MenuItem onClick={() => navigate('/Buscar-Pago')}>
                  <ChevronRightIcon fontSize='1.5rem' />Buscar transacción
                </MenuItem>

              </AccordionDetails>
            </StyledAcordion>
            <IconButton  sx={{ gap: 2, borderRadius: 0, color: '#d84707' }} onClick={() => navigate('/Login')}><ArrowBackIcon />Sign off</IconButton>

          </Stack>
          : 
          <Stack
          spacing={2}
          direction={'column'}
          alignItems={'center'}
          sx={match ? { padding: 20} : {padding: 5}}
        >  
            <img className='Icono-main' src={iconoOso} />
            <Typography sx={{ fontSize: '1.8rem', color: '#d84707', fontWeight: 3 }} >{"Bienvenido, Voluntario"}</Typography>
            
              <Button 
              variant='contained' 
              onClick={() => navigate('/Registro-Usuario')} 
              startIcon={<PersonAddIcon/>} 
              sx={{
                width: '80%',
                backgroundColor: '#fff',
                color: '#000000', 
                border: '1.7px solid #FE6A16',
                borderRadius: '10px',
                '&:hover':{
                  backgroundColor: '#F2F2F2'
                }
              }}>
              <Typography sx={{fontSize:{md: '1.4rem'}}}>Registrar Cliente</Typography>
              </Button>
              <Button 
              variant='contained' 
              onClick={() => navigate('/Buscar-Cliente')}  
              startIcon={<PersonSearchIcon/>}
              sx={{
                width: '80%', 
                backgroundColor: '#fff',
                color: '#000000', 
                border: '1.7px solid #FE6A16',
                borderRadius: '10px',
                '&:hover':{
                  backgroundColor: '#F2F2F2'
                }
              }}>
              <Typography sx={{fontSize:{md: '1.4rem'}}}>Buscar Cliente</Typography>
              </Button>
              <Button 
              variant='contained' 
              onClick={() => navigate('/Registro-Animal')} 
              startIcon={<AddIcon/>}
              sx={{
                width: '80%', 
                backgroundColor: '#fff',
                color: '#000000', 
                border: '1.7px solid #FE6A16',
                borderRadius: '10px',
                '&:hover':{
                  backgroundColor: '#F2F2F2'
                }
              }}>
               <Typography sx={{fontSize:{md: '1.4rem'}}}>Registrar Animal</Typography>
                </Button>
              <Button 
              variant='contained' 
              onClick={() => navigate('/Buscar-Animal')} 
              startIcon={<ManageSearchIcon/>}
              sx={{
                width: '80%', 
                backgroundColor: '#fff',
                color: '#000000', 
                border: '1.7px solid #FE6A16',
                borderRadius: '10px', 
                '&:hover':{
                  backgroundColor: '#F2F2F2'
                }
              }}>
                <Typography sx={{fontSize:{md: '1.4rem'}}}>Buscar Animal</Typography>
                </Button>

            <IconButton  sx={{ gap: 2, borderRadius: 0, color: '#d84707', fontSize: '1.5rem' }} onClick={() => navigate('/Login')}><ArrowBackIcon />Sign off</IconButton>
            </Stack>
          }
          </Box> 
    </div>
  )
}

export default Home