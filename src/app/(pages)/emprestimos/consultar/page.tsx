'use client'

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper 
} from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Search, Edit } from '@mui/icons-material';
import { useQuery } from 'react-query';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

interface Emprestimo {
  id: string;
  livro: string;
  usuario: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  status: string;
}

const ConsultarEmprestimo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const columns: GridColDef[] = [
    { 
      field: 'editar', 
      type: 'actions', 
      headerName: 'Editar', 
      width: 100, 
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row.id}
          icon={<Edit />}
          label="Editar"
          onClick={() => router.push(`/emprestimos/editar/${params.row.id}`)}
        />
      ]
    },
    { field: 'livro', headerName: 'Livro', width: 250 },
    { field: 'usuario', headerName: 'Usuário', width: 250 },
    { field: 'dataEmprestimo', headerName: 'Data de Empréstimo', width: 180 },
    { field: 'dataDevolucaoPrevista', headerName: 'Devolução Prevista', width: 180 },
    { field: 'dataDevolucao', headerName: 'Data de Devolução', width: 180 },
    { field: 'status', headerName: 'Status', width: 150 }
  ];

  const { isLoading, error, data } = useQuery<Emprestimo[]>('emprestimos', 
    () => api.get('/emprestimo/todos').then((res) => res.data)
  );

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error...</>;

  const filteredRows = data?.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Consultar Empréstimos
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
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Buscar
        </Button>
      </Box>
      <Paper sx={{ width: '100%', height: '60vh' }}>
        <DataGrid 
          columns={columns}
          rows={filteredRows || []}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </Paper>
    </Container>
  );
};

export default ConsultarEmprestimo;
