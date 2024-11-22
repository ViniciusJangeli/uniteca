'use client'

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  TextField
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import api from "@/utils/api";
import { Edit } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import Loading from '@/app/components/Geral/Loading';
import Error from '@/app/components/Geral/Error';

interface Book {
  id: string;
  titulo: string;
  autor: string;
  ano: number;
  editora: string;
  edicao: string;
  volume: string;
  totalPaginas: number;
  totalExemplares: number;
  isbn: string;
}


export default function ConsultaLivros() {
  const [text, setText] = useState('');

  const router = useRouter()

  const columns: GridColDef[] = [
    { field: 'editar', type: 'actions', headerName: 'Editar Livro', width: 100, getActions: (params) => [
    <GridActionsCellItem
      key={params.row.id}
      icon={<Edit/>}
      label='Editar Livro'
      onClick={() => 
        router.push(`/livros/editar/${params.row.id}`)
      }
    />]
    },
    { field: 'titulo', headerName: 'Título', width: 300 },
    { field: 'autor', headerName: 'Autor', width: 230 },
    { field: 'ano', headerName: 'Ano de Publicação', type: 'number', width: 150 },
    { field: 'editora', headerName: 'Editora', width: 150 },
    { field: 'edicao', headerName: 'Edição', width: 100 },
    { field: 'volume', headerName: 'Volume', width: 100 },
    { field: 'totalPaginas', headerName: 'Páginas', width: 100 },
    { field: 'totalExemplares', headerName: 'Em Acervo', width: 100 },
    { field: 'isbn', headerName: 'ISBN', width: 150 },
  ];

  const handlerText = (value: string) => {
    setText(value);
  };

  const { isLoading, error, data } = useQuery<Book[]>('Obtendo todos os livros do banco de dados', 
    () => api.get('/livros/todos').then((res) => res.data)
  );

  if (isLoading) return <Loading/>;
  if (error) return <Error/>;

  const filteredRows = data?.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(text.toLowerCase())
    )
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Consulta de Livros
        </Typography>
        <Box sx={{ mb: 3 }}>
          <TextField 
            sx={{width: '100%'}}
            placeholder='Digite aqui o Nome do Livro, Autor, Editora, ISBN...' 
            onChange={(event) => handlerText(event.target.value)} 
          />
        </Box>
        <Paper sx={{ width: '100%', height: '60vh' }}>
          <DataGrid 
            columns={columns}
            rows={filteredRows}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </Paper>
      </Container>
    </Box>
  );
}
