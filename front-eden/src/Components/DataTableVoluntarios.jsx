import React, { useState } from 'react'
import {
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    ThemeProvider,
    styled,
    TablePagination,
    TableFooter,

} from '@mui/material';
import theme from '../Theme';
import MasOpcionesBotonVoluntarios from './MasOpcionesVoluntarios';

function createData(Cedula, Nombre, Apellido, Telefono, Correo, Acciones) {
    return { Cedula, Nombre, Apellido, Telefono, Correo, Acciones };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#881600',
    color: '#fff'
}));

const rows = [
    {Cedula:123, Nombre:"Holaloco", Apellido:"Queloquiza", Telefono:123456, Correo:"locos@loquiando.com"}
];

export default function VolutariosTable({datosBd, reload}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 5));
     setPage(0);
    };

    return (
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{}}>
                        <TableRow>
                            <StyledTableCell align="center">Cedula</StyledTableCell>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Cargo</StyledTableCell>
                            <StyledTableCell align="center">Telefono</StyledTableCell>
                            <StyledTableCell align="center">Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datosBd.slice(page * rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell component="th" scope="row" align="center"> {row.cedula}</TableCell>
                                <TableCell align="center">{row.nombre}</TableCell>
                                <TableCell align="center">{row.cargo}</TableCell>
                                <TableCell align="center">{row.telefono}</TableCell>
                                <TableCell align="center"> <MasOpcionesBotonVoluntarios row={row} reload={reload} /> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[4]}
                            count={datosBd.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{backgroundColor: '#881600', color: '#fff'}}
                        />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}
