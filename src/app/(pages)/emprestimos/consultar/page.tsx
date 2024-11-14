'use client'

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface Emprestimo {
  id: number;
  livro: string;
  usuario: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  status: string;
}

const ConsultarEmprestimo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);

  const handleSearch = () => {
    // Simulating API call
    const mockEmprestimos: Emprestimo[] = [
      { id: 1, livro: "1984", usuario: "João Silva", dataEmprestimo: "2023-05-01", dataDevolucao: "2023-05-15", status: "Devolvido" },
      { id: 2, livro: "Dom Quixote", usuario: "Maria Santos", dataEmprestimo: "2023-05-10", dataDevolucao: "2023-05-24", status: "Em andamento" },
    ];
    setEmprestimos(mockEmprestimos);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Consultar Empréstimo
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Buscar por ID, Livro ou Usuário"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
          variant="contained" 
          startIcon={<Search />}
          onClick={handleSearch}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Buscar
        </Button>
      </Box>
      {emprestimos.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Livro</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Data de Empréstimo</TableCell>
                <TableCell>Data de Devolução</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emprestimos.map((emprestimo) => (
                <TableRow key={emprestimo.id}>
                  <TableCell>{emprestimo.id}</TableCell>
                  <TableCell>{emprestimo.livro}</TableCell>
                  <TableCell>{emprestimo.usuario}</TableCell>
                  <TableCell>{emprestimo.dataEmprestimo}</TableCell>
                  <TableCell>{emprestimo.dataDevolucao}</TableCell>
                  <TableCell>{emprestimo.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ConsultarEmprestimo;