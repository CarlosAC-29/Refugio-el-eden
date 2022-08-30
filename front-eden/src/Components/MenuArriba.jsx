import React, { useEffect, useState } from 'react'
import {
  Link,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
  ThemeProvider,
  styled,
  IconButton

} from '@mui/material'
import IconoSinTitulo from '../Images/IconoSinTitulo.png'
import { Link as RouterLink } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';

import { user, getVoluntarios, idVoluntario } from '../Functions/SqlFunctions';

import "../styles/Menu.css"


const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: '#EAE0D5',
  borderRadius: 0,
  height: '30px',
  color: '#ff5c0c',
  fontSize: 20,


  '&: hover': {
    backgroundColor: '#CEC2B5'
  },

}));

function MenuArriba() {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('md'));


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [esAdimin, setEsAdmin]=useState(false);
  const [nombree, setNombree]=useState("Username");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {
        match ? (
          <Container
            className='MenuCel'
            sx={{ backgroundColor: "#EAE0D5" }}
          >
            <Button onClick={() => setIsOpen(true)}>
              <Stack
                direction='row'
                justifyContent="center"
                alignItems='center'
                spacing={1}
              >
                <img src={IconoSinTitulo} />
                <Typography color='#f54021'> menu</Typography>
              </Stack>
            </Button>
            <React.Fragment>
              <Drawer
                anchor='left'
                open={isOpen}
                onClose={() => setIsOpen(false)}
              >
                <List>
                  <ListItemButton>
                    <Link underline='none' variant='subtitle1' color='#f54021' component={RouterLink} to='/'>
                      Inicio
                    </Link>
                  </ListItemButton>
                  <ListItemButton>
                    <Link underline='none' variant='subtitle1' color='#f54021' component={RouterLink} to='/Registro-Usuario'>
                      Registrar Usuario
                    </Link>
                  </ListItemButton>
                  <ListItemButton>
                    <Link underline='none' variant='subtitle1' color='#f54021' component={RouterLink} to='/Registro-Animal'>
                      Registrar Animal
                    </Link>
                  </ListItemButton>
                  <ListItemButton>
                    <Link underline='none' variant='subtitle1' color='#f54021' component={RouterLink} to='/Buscar-Animal'>
                      Buscar Animal
                    </Link>
                  </ListItemButton>
                </List>

              </Drawer>
            </React.Fragment>
          </Container>
        ) : (

          <Stack
            className='MenuC'
            sx={{ height: 110, backgroundColor: "#EAE0D5", paddingTop: 2 }}
            direction="row"
            alignItems='flex-start'
            justifyContent='space-between'
          >
            <Stack direction="row" spacing={2} alignItems='center'>
              <img src={IconoSinTitulo} />
              <Typography variant='h2' sx={{ fontWeight: 'bold' }} color='#ff5c0c'>EL EDEN</Typography>

            </Stack>
          </Stack>

        )
      }

    </div>
  )
}

export default MenuArriba

/**Codigo para hacer un menu
 * 
 * <Link underline='none' variant='subtitle1' color='#f54021' component={RouterLink} to='/'>
                    Inicio
                  </Link>
                  <Link underline='none' variant='subtitle1' color='#f54021' component={RouterLink} to='/Registro-Usuario'>
                    Registrar Usuario
                  </Link>
                  <Link underline='none' variant='subtitle1' color='#f54021' component={RouterLink} to='/Registro-Animal'>
                    Registrar Animal
                  </Link>
                  <Link underline='none' variant='subtitle1' color='#f54021' component={RouterLink} to='/Buscar-Animal'>
                    Buscar Animal
                  </Link>
 */