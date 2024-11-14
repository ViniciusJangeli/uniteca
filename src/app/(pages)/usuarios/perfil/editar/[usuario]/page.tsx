'use client'

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { Edit } from '@mui/icons-material';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
}

const EditarUsuario: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario>({
    id: '',
    nome: '',
    email: '',
    telefone: '',
    tipo: ''
  });

  useEffect(() => {
    // Simulating API call to fetch user data
    const fetchUsuario = async () => {
      // In a real application, you would fetch the user data based on an ID, perhaps from the URL
      const mockUsuario: Usuario = {
        id: '1',
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(11) 99999-9999',
        tipo: 'Estudante'
      };
      setUsuario(mockUsuario);
    };

    fetchUsuario();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send this data to your backend
    console.log(usuario);
    // Show success message or redirect
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Editar Usuário
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          fullWidth
          label="Nome"
          name="nome"
          value={usuario.nome}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={usuario.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Telefone"
          name="telefone"
          value={usuario.telefone}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="tipo-usuario-label">Tipo de Usuário</InputLabel>
          <Select
            labelId="tipo-usuario-label"
            id="tipo-usuario"
            name="tipo"
            value={usuario.tipo}
            label="Tipo de Usuário"
            onChange={handleChange}
            required
          >
            <MenuItem value="Estudante">Estudante</MenuItem>
            <MenuItem value="Professor">Professor</MenuItem>
            <MenuItem value="Funcionário">Funcionário</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<Edit />}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Atualizar Usuário
        </Button>
      </Box>
    </Container>
  );
};

export default EditarUsuario;