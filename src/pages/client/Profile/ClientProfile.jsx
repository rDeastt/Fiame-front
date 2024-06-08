import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import axios from "axios";
import {urlGlobal} from "../../../environment/env.js";
import Swal from "sweetalert2";

export const ClientProfile = () => {
    const storedUser = sessionStorage.getItem('Usuario');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [formData, setFormData] = useState({
        dni: user ? user.dni : '',
        name: user ? user.name : '',
        lastname: user ? user.lastname : '',
        password: user ? user.user.password : '',
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
        const Client = {
            id: user.id,
            name: formData.name,
            lastname: formData.lastname,
            dni: user.dni,
            credit_limit: user.credit_limit,
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
                    const userResponse = await axios.put(urlGlobal + "client/update", Client);
                    sessionStorage.setItem("Usuario", JSON.stringify(userResponse.data));
                    Swal.fire({
                        title: "Cambios realizados!",
                        text: "Modificaste exitosamente tu perfil",
                        icon: "success",
                        customClass: {
                            confirmButton: 'my-custom-button'
                        },
                        buttonsStyling: false
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Ocurrio un error",
                    });
                    console.log(error);
                }
            }
        });
        console.log(Client);
    };

    return (
        <Box sx={{ bgcolor: '#07AEBA', minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="md" sx={{ bgcolor: 'white', padding: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Avatar
                        alt="Client Photo"
                        src="https://i.imgur.com/3PoiBzZ.png"  // Asegúrate de que la ruta de la imagen sea correcta
                        sx={{ width: 150, height: 150, border: '2px solid #0288d1' }}
                    />
                </Box>
                <Typography variant="h4" align="center" gutterBottom>
                    Perfil
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="DNI del Cliente"
                            variant="outlined"
                            name="dni"
                            value={formData.dni}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nombres"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Apellidos"
                            variant="outlined"
                            name="lastname"
                            value={formData.lastname}
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
