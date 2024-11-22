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
import { Search, Edit, LibraryBooks } from '@mui/icons-material';
import { useQuery } from 'react-query';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Geral/Loading';
import Error from '@/app/components/Geral/Error';

const ConsultarEmprestimo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const columns: GridColDef[] = [
    { 
      field: 'acoes', 
      type: 'actions', 
      headerName: 'Ações', 
      width: 100, 
      getActions: (params) => {
        if (params.row.status === 'Devolvido') {
          return [
            <GridActionsCellItem
              key={params.row.id}
              icon={<LibraryBooks />}
              label="Consultar Empréstimo"
              onClick={() =>
                router.push(`/emprestimos/consultar/detalhes/${params.row.id}`)
              }
            />
          ];
        }

        return [
          <GridActionsCellItem
            key={params.row.id}
            icon={<LibraryBooks />}
            label="Consultar Empréstimo"
            onClick={() =>
              router.push(`/emprestimos/consultar/detalhes/${params.row.id}`)
            }
          />,
          <GridActionsCellItem
            key={params.row.id}
            icon={<Edit />}
            label="Editar"
            onClick={() => router.push(`/emprestimos/editar/${params.row.id}`)}
          />
        ];
      }
    },
    { field: 'livro', headerName: 'Livro', width: 250 },
    { field: 'usuario', headerName: 'Usuário', width: 250 },
    { field: 'dataEmprestimo', headerName: 'Data de Empréstimo', width: 180 },
    { field: 'dataDevolucaoPrevista', headerName: 'Devolução Prevista', width: 180 },
    { field: 'dataDevolucao', headerName: 'Data de Devolução', width: 180 },
    { field: 'status', headerName: 'Status', width: 150 }
  ];

  const { isLoading, error, data } = useQuery('emprestimos', 
    () => api.get('/emprestimo/todos').then((res) => res.data)
  );

  if (isLoading) return <Loading/>;
  if (error) return <Error/>;

  const processedData = data?.map((item: { id: string; livro: { titulo: string; }; usuario: { nome: string; }; dataEmprestimo: string | number | Date; dataDevolucaoPrevista: string | number | Date; dataDevolucao: string | number | Date; status: string; }) => ({
    id: item.id,
    livro: item.livro?.titulo || "Desconhecido",
    usuario: item.usuario?.nome || "Desconhecido",
    dataEmprestimo: new Date(item.dataEmprestimo).toLocaleDateString(),
    dataDevolucaoPrevista: new Date(item.dataDevolucaoPrevista).toLocaleDateString(),
    dataDevolucao: item.dataDevolucao
      ? new Date(item.dataDevolucao).toLocaleDateString()
      : "Pendente",
    status: item.status,
  }));

  const filteredRows = processedData?.filter((row: { [s: string]: unknown; } | ArrayLike<unknown>) =>
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
