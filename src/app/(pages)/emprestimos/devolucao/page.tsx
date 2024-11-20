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
import { AssignmentReturn } from '@mui/icons-material';

const RegistrarDevolucao: React.FC = () => {
  const [emprestimo, setEmprestimo] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ emprestimo, dataDevolucao });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Registrar Devolução
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="emprestimo-select-label">Empréstimo</InputLabel>
          <Select
            labelId="emprestimo-select-label"
            id="emprestimo-select"
            value={emprestimo}
            label="Empréstimo"
            onChange={(e: SelectChangeEvent) => setEmprestimo(e.target.value as string)}
          >
            <MenuItem value="1">1984 - João Silva</MenuItem>
            <MenuItem value="2">Dom Quixote - Maria Santos</MenuItem>
            <MenuItem value="3">Cem Anos de Solidão - Pedro Oliveira</MenuItem>
          </Select>
        </FormControl>
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
          startIcon={<AssignmentReturn />}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Registrar Devolução
        </Button>
      </Box>
    </Container>
  );
};

export default RegistrarDevolucao;