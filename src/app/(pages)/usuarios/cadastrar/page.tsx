'use client'

import React, { useState } from 'react';
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
import { PersonAdd } from '@mui/icons-material';

const CadastrarUsuario: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipo, setTipo] = useState('');
  const [cpf, setCpf] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ nome, email, telefone, tipo, cpf });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Cadastrar Usuário
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          fullWidth
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="tipo-usuario-label">Tipo de Usuário</InputLabel>
          <Select
            labelId="tipo-usuario-label"
            id="tipo-usuario"
            value={tipo}
            label="Tipo de Usuário"
            onChange={(e: SelectChangeEvent) => setTipo(e.target.value as string)}
            required
          >
            <MenuItem value="Estudante">Estudante</MenuItem>
            <MenuItem value="Bibliotecário(a) | Pleno">Bibliotecário(a) | Pleno</MenuItem>
            <MenuItem value="Bibliotecário(a) | Senior">Bibliotecário(a) | Senior</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<PersonAdd />}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Cadastrar Usuário
        </Button>
      </Box>
    </Container>
  );
};

export default CadastrarUsuario;