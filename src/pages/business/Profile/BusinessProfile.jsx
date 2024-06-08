import {useState} from "react";
import {urlGlobal} from "../../../environment/env.js";
import axios from "axios";
import {Avatar, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import * as PropTypes from "prop-types";
import Swal from "sweetalert2";
export const BusinessProfile = () => {
    const storedUser = sessionStorage.getItem('Usuario');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [formData, setFormData] = useState({
        ruc: user ? user.ruc : '',
        name: user ? user.name : '',
        password: user ? user.user.password : '',
        address: user ? user.address : '',
        email: user ? user.user.email : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        const business = {
            id: user.id,
            ruc: user.ruc,
            name: formData.name,
            address: formData.address,
            user: {
                id: user.user.id,
                email: formData.email,
                password: formData.password,
                type: user.user.type
            }
        };

        Swal.fire({
            title: "¿Seguro que quieres cambiar esto?",
            text: "Asegurate que todo lo que quieres cambiar sea correcto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, deseo continuar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const userResponse = await axios.put(`${urlGlobal}business/update`, business);
                    Swal.fire({
                        title: "Cambios realizados!",
                        text: "Modificaste exitosamente tu perfil",
                        icon: "success",
                        customClass: {
                            confirmButton: 'my-custom-button'
                        },
                        buttonsStyling: false
                    });
                    sessionStorage.setItem("Usuario", JSON.stringify(userResponse.data));
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Ocurrió un error",
                    });
                    console.log(error);
                }
            }
        });
        console.log('Updated data:', formData);
    };

    return (
        <Box sx={{ bgcolor: '#07AEBA', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="md" sx={{ bgcolor: 'white', padding: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Avatar
                        alt="Business Photo"
                        src="https://i.imgur.com/lAIwtsY.jpg"
                        sx={{ width: 150, height: 150, border: '2px solid #0288d1' }}
                    />
                </Box>
                <Typography variant="h4" align="center" gutterBottom>
                    Perfil de Negocio
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="RUC del Negocio"
                            variant="outlined"
                            name="ruc"
                            value={formData.ruc}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Dirección del Negocio"
                            variant="outlined"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre de la Empresa"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Contraseña"
                            variant="outlined"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" color="error">
                            Eliminar
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" color="primary" onClick={handleUpdate}>
                            Actualizar
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};