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
import { LibraryAdd } from '@mui/icons-material';

const FazerEmprestimo: React.FC = () => {
  const [livro, setLivro] = useState('');
  const [usuario, setUsuario] = useState('');
  const [dataEmprestimo, setDataEmprestimo] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send this data to your backend
    console.log({ livro, usuario, dataEmprestimo, dataDevolucao });
    // Reset form or show success message
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Fazer Empréstimo
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="livro-select-label">Livro</InputLabel>
          <Select
            labelId="livro-select-label"
            id="livro-select"
            value={livro}
            label="Livro"
            onChange={(e: SelectChangeEvent) => setLivro(e.target.value as string)}
          >
            <MenuItem value="1984">1984</MenuItem>
            <MenuItem value="Dom Quixote">Dom Quixote</MenuItem>
            <MenuItem value="Cem Anos de Solidão">Cem Anos de Solidão</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="usuario-select-label">Usuário</InputLabel>
          <Select
            labelId="usuario-select-label"
            id="usuario-select"
            value={usuario}
            label="Usuário"
            onChange={(e: SelectChangeEvent) => setUsuario(e.target.value as string)}
          >
            <MenuItem value="João Silva">João Silva</MenuItem>
            <MenuItem value="Maria Santos">Maria Santos</MenuItem>
            <MenuItem value="Pedro Oliveira">Pedro Oliveira</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Data de Empréstimo"
          type="date"
          value={dataEmprestimo}
          onChange={(e) => setDataEmprestimo(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Data de Devolução"
          type="date"
          value={dataDevolucao}
          onChange={(e) => setDataDevolucao(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<LibraryAdd />}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Registrar Empréstimo
        </Button>
      </Box>
    </Container>
  );
};

export default FazerEmprestimo;