'use client'

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Paper
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomInput from '@/app/components/Geral/CustomInput'

// Dados de exemplo para a tabela
const rows = [
  { id: 1, titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', isbn: '9788573264746', ano: 1605 },
  { id: 2, titulo: '1984', autor: 'George Orwell', isbn: '9788535914849', ano: 1949 },
  { id: 3, titulo: 'Cem Anos de Solidão', autor: 'Gabriel García Márquez', isbn: '9788535914849', ano: 1967 },
  { id: 4, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', isbn: '9788574123745', ano: 1943 },
  { id: 5, titulo: 'Crime e Castigo', autor: 'Fiódor Dostoiévski', isbn: '9788573264746', ano: 1866 },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'titulo', headerName: 'Título', width: 300 },
  { field: 'autor', headerName: 'Autor', width: 230 },
  { field: 'isbn', headerName: 'ISBN', width: 150 },
  { 
    field: 'ano', 
    headerName: 'Ano de Publicação', 
    type: 'number', 
    width: 180,
  },
];

export default function ConsultaLivros() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Consulta de Livros
        </Typography>
        <Box sx={{ mb: 3 }}>
          <CustomInput
            title="Pesquisar Livros"
            placeholder="Digite para pesquisar por título, autor ou ISBN"
            helperText="A pesquisa é realizada em todos os campos da tabela."
          />
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#005387',
                color: 'white',
                fontSize: 16,
              },
              '& .MuiDataGrid-cell:hover': {
                color: '#1D3557',
              },
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}