import React from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  useMediaQuery,
} from '@mui/material';
import '../styles/Login.css';
import iconoOso from '../Images/IconoOso.png'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import ForestIcon from '@mui/icons-material/Forest';
import {validarLogin, encontrado} from '../Functions/SqlFunctions'




function Login() {
  const navigate = useNavigate();
  const match = useMediaQuery('(min-height: 900px)');

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
      onSubmit: async (values) => {
          let loginData = JSON.stringify(values, null, 2)
          const user = JSON.parse(loginData).userName;
          const contra = JSON.parse(loginData).password;

          console.log(user)
          console.log(contra)
          
          await validarLogin(user, contra);

          if(encontrado){
            navigate('/');
          }
          
   }
  });

  return (
    <div className="Contenedor-login">
      <Box
        sx={{
          backgroundColor: 'rgba(226, 226, 226, 0.65)',
          boxShadow: '0 0 1rem 0 rgba(0,0,0, 0.2)',
          borderRadius: '10px',
          backdropFilter: 'blur( 5px )',
          width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: '35%',
            xl: '35%'
          },
          padding: '2rem',
          flexDirection: "column",
          alignContent: "right",
          borderRadius: '30px',
          height: '95%',
          maring: '5px',
        }}>
         <form onSubmit={formik.handleSubmit}>

        <Stack
          spacing={match ? 8.3 : 5}
          justifyContent="center"
          direction={'column'}
          alignItems={'center'}
        >
            <img className='Icono-main' src={iconoOso} height='100'/>
          <Box sx={{display: 'flex', gap: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Box sx={match? {padding: 1}: ''}>
            <ForestIcon fontSize="large"/>
            </Box>
            <Typography variant="h1" sx= { match ?{ fontWeight: 3 , fontSize: '3rem'}:{ fontWeight: 3} }>Login</Typography>
          </Box>
          <Box sx={{ width: '80%', display: 'flex' }}>
            <TextField
              fullWidth id="userName"
              label="Usuario"
              variant="filled"
              name='userName'
              value={formik.values.userName}
              onChange={formik.handleChange}
              sx={{ background: '#fff' }}
            />
          </Box>
          <Box sx={{ width: '80%' }}>
            <TextField
              fullWidth
              id="password"
              label="Password"
              variant="filled"
              name='password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              sx={{ background: '#fff' }}
            />
          </Box>
          <Box sx={{ alignItems: 'center', justifyContent: 'center', width: '80%' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#F25019', width: '100%', height: '50px' }}
              type='submit'
            >
              Sign In
            </Button>
          </Box>
        </Stack>
        </form> 

      </Box>
    </div>
  )
}

export default Login;