import React, { useEffect, useState } from 'react'
import {
	Button,
	Container,
	Grid,
	Stack,
	TextField,
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import tarifas from '../Images/Tarifas.png';

import ButtonBack from '../Components/ButtonBack';

import { useFormik } from 'formik';

import MenuArriba from '../Components/MenuArriba';

import '../styles/RegistrarUsu.css';

import { calcularTarifa, user, registrarPago, } from '../Functions/SqlFunctions';

import { clientId, clientName, getClientDataP, clienteCedula, clienteNombre, getCliente, idAnimal, nombreAnimal, especieAnimal, animal, reset } from '../Functions/UtilityF';

export default function RegistrarPago(nombre) {

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = async () => {
		setOpen(true);
		const byTarifa = await calcularTarifa(animal)
		setValorTarifa(byTarifa);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const cancel = () => {
		reset();
		navigate('/');
	}

	const [noDonor, setNoDonor] = useState(true);
	const [namePage, setNamePage] = useState("Apadrinamiento");
	const [valorTarifa, setValorTarifa] = useState(0)

	useEffect(() => {
		async function traemeDatos() {
			await getClientDataP({ id: "1234", name: "Julio" });
		}
		traemeDatos();
		console.log(noDonor);
		console.log(clienteCedula)
	});


	const navigate = useNavigate();



	const formik = useFormik({
		initialValues: {
			ValorPago: 0,
		},
		onSubmit: async (values) => {
			const pagoDon = JSON.stringify(values, null, 2);
			const pagoFinalD = JSON.parse(pagoDon).ValorPago
			if (namePage != "Donador") {
				console.log("Primer elemento de array " + user[0].cedula);
				await registrarPago(idAnimal, clienteCedula, user[0].cedula, valorTarifa, "Patrocinador");
			} else {
				console.log("Monda");
				await registrarPago(null, clienteCedula, user[0].cedula, pagoFinalD, "Donador");
			}
		}
	});

	return (
		<div className='RegistrarUsuCont'>
			<MenuArriba />
			<Box sx={{
				width: {
					xs: '100%',
					sm: '100%',
					md: '100%',
					lg: '45%',
					xl: '45%'
				},
				backgroundColor: 'rgba(226, 226, 226, 0.95)',
				paddingTop: 5,
				borderRadius: '15px',
				flexDirection: "column",
				alignContent: "right",
				marginTop:{
					xs: 0,
					sm: 0,
					md: 0,
					lg: 4,
					xl: 4
				},
				marginLeft: {
					xs: 0,
					sm: 0,
					md: 0,
					lg: 20,
					xl: 20
				}

			}}>
				<Grid container component="main">

					<Stack
						spacing={8}
						justifyContent="center"
						direction={'column'}
						alignItems={'center'}
						sx={{ paddingBottom: 4, paddingTop: 3 }}
					>

						<Typography alignSelf={'center'} variant='h1' color={'#881600'}>{"Pago " + namePage}</Typography>

						<form onSubmit={formik.handleSubmit}>
							<Grid container rowSpacing={6}>
								<Grid item xs={11} md={6}>
									<Container>
										<TextField fullWidth id="ClienteId" label="Cliente ID" variant="filled" name='ClienteId' value={clienteCedula} disabled />
									</Container>
								</Grid>
								<Grid item xs={11} md={6}>
									<Container>
										<TextField fullWidth id="Apellido" label="Nombre Cliente" variant="filled" name='Apellido' value={clienteNombre} disabled />
									</Container>
								</Grid>
								<Grid item xs={4} md={2}>
									<Container>
										<Button
											variant="outlined"
											size='small'
											onClick={() => { setNamePage("Apadrinamiento"); setNoDonor(true); }}
											sx={{ border: '3px solid #881600', borderRadius: 15, ':hover': { border: '3px solid #881600' } }}

										>
											<Typography
												sx={{
													fontSize: 20
												}}
												color={'#881600'}
											>
												Ap
											</Typography>
										</Button>
									</Container>
								</Grid>
								<Grid item xs={4} md={2}>
									<Container>
										<Button
											variant="outlined"
											size='small'
											onClick={() => { setNamePage("Albergue"); setNoDonor(true); }}
											sx={{ border: '3px solid #881600', borderRadius: 15, ':hover': { border: '3px solid #881600' } }}

										>
											<Typography
												sx={{
													fontSize: 20
												}}
												color={'#881600'}
											>
												Al
											</Typography>
										</Button>
									</Container>
								</Grid>
								<Grid item xs={4} md={2}>
									<Container>
										<Button
											variant="outlined"
											size='small'
											onClick={() => { setNamePage("Donador"); setNoDonor(false) }}
											sx={{ border: '3px solid #881600', borderRadius: 15, ':hover': { border: '3px solid #881600' } }}

										>
											<Typography
												sx={{
													fontSize: 20
												}}
												color={'#881600'}
											>
												Do
											</Typography>
										</Button>
									</Container>
								</Grid>
								<Grid item xs={11} md={6}>
									<Container>
										<Button
											variant="outlined"
											size='small'
											fullWidth
											onClick={() => { navigate('/Buscar-Animal') }}
											sx={{ border: '3px solid #881600', borderRadius: 3, ':hover': { border: '3px solid #881600' } }}

										>
											<Typography
												sx={{
													fontSize: 20
												}}
												color={'#881600'}
											>
												Seleccionar animal
											</Typography>
										</Button>
									</Container>
								</Grid>
							</Grid>
							{noDonor ?
								<Grid container rowSpacing={2} sx={{ paddingTop: 3 }}>
									<Grid item xs={11} md={4} >
										<Container>
											<TextField fullWidth id="Telefono" label="Id Animal" variant="filled" name='Telefono' value={idAnimal} disabled />
										</Container>
									</Grid>
									<Grid item xs={11} md={4}>
										<Container>
											<TextField fullWidth id="Cedula" label="Nombre Animal" variant="filled" name='Cedula' value={nombreAnimal} disabled />
										</Container>
									</Grid>
									<Grid item xs={11} md={4}>
										<Container>
											<TextField fullWidth id="Cedula" label="Tipo de animal" variant="filled" name='Cedula' value={especieAnimal} disabled />
										</Container>
									</Grid>
									<Grid item xs={4} md={4}>
										<Container>

											<Button
												variant="contained"
												size='small'
												fullWidth
												onClick={handleClickOpen}

											>
												<Typography
													sx={{
														fontSize: {
															xs: 20,
															sm: 20,
															md: 30,
															lg: 30,
															xl: 30
														}
													}}
													color={'#fff'}
												>
													Tarifas
												</Typography>
											</Button>
											<Dialog
												open={open}
												onClose={handleClose}
											>
												
													<img className='precios' src={tarifas} />

											</Dialog>
										</Container>
									</Grid>
									<Grid item xs={7} md={8}>
										<Container>
											<TextField fullWidth id="ValorTarifaPago" label="Valor a pagar" variant="filled" name='ValorTarifaPago' value={valorTarifa} disabled />
										</Container>
									</Grid>
								</Grid>
								:
								<Box sx={{ paddingTop: 3 }}>
									<Container>
										<TextField fullWidth id="ValorPago" label="Valor a pagar" variant="filled" name='ValorPago' value={formik.values.ValorPago} onChange={formik.handleChange} />
									</Container>
								</Box>
							}


							<Stack direction={'row'} spacing={2} justifyContent={'space-between'} sx={{ paddingTop: 5 }}>
								<Container>
									<Button
										variant="outlined"
										size='medium'
										fullWidth
										onClick={cancel}
										sx={{ border: '3px solid #881600', borderRadius: 10, ':hover': { border: '3px solid #881600' } }}

									>
										<Typography
											sx={{
												fontSize: {
													xs: 20,
													sm: 20,
													md: 30,
													lg: 30,
													xl: 30
												}
											}}
											color={'#881600'}
										>
											Cancelar
										</Typography>
									</Button>
								</Container>
								<Container>
									<Button
										variant="outlined"
										size='medium'
										fullWidth
										type='submit'
										sx={{ border: '3px solid #881600', borderRadius: 10, ':hover': { border: '3px solid #881600' } }}

									>
										<Typography
											sx={{
												fontSize: {
													xs: 20,
													sm: 20,
													md: 30,
													lg: 30,
													xl: 30
												}
											}}
											color={'#881600'}
										>
											Pagar
										</Typography>
									</Button>
								</Container>
							</Stack>
						</form>
					</Stack>
				</Grid>
			</Box>
		</div>
	)
}
/**
 * <Container>
										<FormControl fullWidth variant="filled" sx={{ backgroundColor: 'rgba(226, 226, 226, 0.95)' }}>
											<InputLabel id="demo-simple-select-filled-label">Motivo Pago</InputLabel>
											<Select
												labelId="MotivoP"
												id="MotivoP"
												name='MotivoP'
												value={formik.values.MotivoP}
												label="Motivo Pago"
												onChange={formik.handleChange}
											>
												<MenuItem sx={{ borderRadius: 0 }} value={"Albergue"}>Albergue</MenuItem>
												<MenuItem sx={{ borderRadius: 0 }} value={"Apadrinamiento"}>Apadrinamiento</MenuItem>
												<MenuItem sx={{ borderRadius: 0 }} value={"Donacion"}>Donacion</MenuItem>

											</Select>
										</FormControl>
									</Container>
 * 
 */