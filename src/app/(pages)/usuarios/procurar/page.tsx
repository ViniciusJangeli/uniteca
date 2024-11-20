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

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataRegistro: string;
}

const ProcurarUsuario: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const handleSearch = () => {

    const mockUsuarios: Usuario[] = [
      { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 99999-9999", dataRegistro: "2023-01-15" },
      { id: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "(11) 88888-8888", dataRegistro: "2023-02-20" },
    ];
    setUsuarios(mockUsuarios);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Procurar Usuário
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Buscar por Nome, Email ou ID"
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
      {usuarios.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Data de Registro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.telefone}</TableCell>
                  <TableCell>{usuario.dataRegistro}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ProcurarUsuario;