'use client'

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Search, AddBox, AssignmentReturn } from '@mui/icons-material';
import ActionCard from '@/app/components/Geral/Cards';
import Grid from '@mui/material/Grid2'

const InicioEmprestimos: React.FC = () => {
  const actions = [
    {
      icon: Search,
      title: 'Consultar Empréstimo',
      description: 'Visualize informações sobre os empréstimos realizados',
      link: '/emprestimos/consultar'
    },
    {
      icon: AddBox,
      title: 'Fazer Empréstimo',
      description: 'Registre um novo empréstimo de livro',
      link: '/emprestimos/novo'
    },
    {
      icon: AssignmentReturn,
      title: 'Registrar Devolução',
      description: 'Registre a devolução de um livro emprestado',
      link: '/emprestimos/devolucao'
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
          Gerenciamento de Empréstimos
        </Typography>
        <Grid container spacing={4}>
          {actions.map((action, index) => (
              <ActionCard key={index} {...action} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default InicioEmprestimos;