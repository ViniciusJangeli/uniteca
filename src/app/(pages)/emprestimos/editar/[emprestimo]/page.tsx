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

interface Emprestimo {
  id: string;
  livroId: string;
  usuarioId: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  status: string;
}

const EditarEmprestimo: React.FC = () => {
  const [emprestimo, setEmprestimo] = useState<Emprestimo>({
    id: '',
    livroId: '',
    usuarioId: '',
    dataEmprestimo: '',
    dataDevolucao: '',
    status: ''
  });

  useEffect(() => {
    const fetchEmprestimo = async () => {
      const mockEmprestimo: Emprestimo = {
        id: '1',
        livroId: '1',
        usuarioId: '1',
        dataEmprestimo: '2023-05-01',
        dataDevolucao: '2023-05-15',
        status: 'Em andamento'
      };
      setEmprestimo(mockEmprestimo);
    };

    fetchEmprestimo();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setEmprestimo(prevEmprestimo => ({
      ...prevEmprestimo,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Editar Empréstimo
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          fullWidth
          label="ID do Livro"
          name="livroId"
          value={emprestimo.livroId}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="ID do Usuário"
          name="usuarioId"
          value={emprestimo.usuarioId}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Data de Empréstimo"
          name="dataEmprestimo"
          type="date"
          value={emprestimo.dataEmprestimo}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          label="Data de Devolução"
          name="dataDevolucao"
          type="date"
          value={emprestimo.dataDevolucao}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="status-emprestimo-label">Status</InputLabel>
          <Select
            labelId="status-emprestimo-label"
            id="status-emprestimo"
            name="status"
            value={emprestimo.status}
            label="Status"
            onChange={handleChange}
            required
          >
            <MenuItem value="Em andamento">Em andamento</MenuItem>
            <MenuItem value="Devolvido">Devolvido</MenuItem>
            <MenuItem value="Atrasado">Atrasado</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<Edit />}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Atualizar Empréstimo
        </Button>
      </Box>
    </Container>
  );
};

export default EditarEmprestimo;