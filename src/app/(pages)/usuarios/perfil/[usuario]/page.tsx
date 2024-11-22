'use client'

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Avatar,
  Tabs,
  Tab,
  Button
} from '@mui/material';
import { Person, Book } from '@mui/icons-material';
import { useParams } from 'next/navigation';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query'; 
import api from "@/utils/api";
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Geral/Loading';
import Error from '@/app/components/Geral/Error';

const PerfilUsuario: React.FC = () => {
  const { usuario: id } = useParams();
  const [tabValue, setTabValue] = useState(0); 
  const router = useRouter()

  const { isLoading, error, data } = useQuery(
    ['usuario', id],
    async () => {
      const response = await api.get(`/usuarios/consultar/${id}`);
      return response.data;
    },
    { 
      enabled: !!id, 
    }
  );

  if (isLoading) return <Loading/>;
  if (error) return <Error/>;


  const { emprestimos } = data;

  const emprestimosRows = emprestimos.map((emprestimo: { 
    id: string; 
    livro: { titulo: string }; 
    dataEmprestimo: string; 
    dataDevolucao?: string; 
    status: string; 
    historicoMultas: { valorMulta: number; status: string }[]; 
  }) => ({
    id: emprestimo.id,
    livroTitulo: emprestimo.livro.titulo,
    dataEmprestimo: new Date(emprestimo.dataEmprestimo).toLocaleDateString(),
    dataDevolucao: emprestimo.dataDevolucao 
      ? new Date(emprestimo.dataDevolucao).toLocaleDateString() 
      : 'Não devolvido',
    status: emprestimo.status,
    valorMulta: emprestimo.historicoMultas?.[0]?.valorMulta || 'Sem multa',
    statusMulta: emprestimo.historicoMultas?.[0]?.status || 'Sem multa',
  }));
  
  const emprestimosColumns: GridColDef[] = [
    { field: 'livroTitulo', headerName: 'Livro', width: 250 },
    { field: 'dataEmprestimo', headerName: 'Data de Empréstimo', width: 180 },
    { field: 'dataDevolucao', headerName: 'Data de Devolução', width: 180 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'valorMulta', headerName: 'Valor Multa', width: 100 },
    { field: 'statusMulta', headerName: 'Status Multa', width: 100 },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 100, height: 100, bgcolor: '#0089B6' }}>
              <Person sx={{ fontSize: 60 }} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1D3557' }}>
              {data.nome}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {data.email} | {data.telefone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.permissoes[0]?.permissao?.titulo} | Cadastrado em: {new Date(data.criadoEm).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => router.push(`/usuarios/perfil/editar/${id}`)}>
              Editar Usuário
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="user profile tabs">
          <Tab label="Histórico de Empréstimos" icon={<Book />} iconPosition="start" />
        </Tabs>
      </Box>

      <Paper sx={{ p: 2 }}>
        <DataGrid 
          rows={emprestimosRows} 
          columns={emprestimosColumns} 
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Paper>
    </Container>
  );
};

export default PerfilUsuario;
