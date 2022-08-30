import React, { useEffect, useState } from 'react'
import {
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    TablePagination,
    TableFooter,
    ThemeProvider,
    styled

} from '@mui/material';
import MasOpcionesBotonAnimales from './MasOpcionesAnimales';
import theme from '../Theme';

function createData(id, nombre, especie, estado, MotivoIngreso, FechaIngreso, FechaSalida) {
    return { id, nombre, especie, estado, MotivoIngreso, FechaIngreso, FechaSalida };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#881600',
    color: '#fff'
}));


export default function AnimalesTable({datosBd, reload}) {

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
                            <StyledTableCell align="center">Identificador</StyledTableCell>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Especie</StyledTableCell>
                            <StyledTableCell align="center">Estado</StyledTableCell>
                            <StyledTableCell align="center">Ingreso</StyledTableCell>
                            <StyledTableCell align="center">Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datosBd.slice(page * rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell component="th" scope="row" align="center"> {row.id_animal}</TableCell>
                                <TableCell align="center">{row.nombre_animal}</TableCell>
                                <TableCell align="center">{row.tipo}</TableCell>
                                <TableCell align="center">{row.estado}</TableCell>
                                <TableCell align="center">{row.motivo_ingreso}</TableCell>
                                <TableCell align="center"><MasOpcionesBotonAnimales row={row} reload={reload} /></TableCell>
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
