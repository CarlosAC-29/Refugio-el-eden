import React from 'react'
import { Typography } from '@mui/material'

import '../styles/Footer.css'

function Footer() {
  return (
    <div className='FooterContainer'>
        <Typography 
        align='center'
        justifySelf={'center'}
        variant='subtitle2' 
        sx={{paddingTop:{
            xs:3,
            sm:3,
            md:3,
            lg:5,
            xl:5
          },
          paddingBottom:{
            xs:1,
            sm:1,
            md:1,
            lg:2,
            xl:2
          }
        }}
        >
          Sistema desarrollado por los mejores desarrolladores del mundo
        </Typography>
    </div>
  )
}

export default Footer