	import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ButtonBack(){

    const navigate = useNavigate();

    return(
        <div>
            <Button variant='contained' onClick={() => navigate('/')} startIcon={<ArrowBackIcon/>}
            sx=
            {{
                margin: 1
            }}
            >
                Volver
            </Button>
        </div>
    );
}

export default ButtonBack;
