'use client'

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Search, PersonAdd, Security } from '@mui/icons-material';
import ActionCard from '@/app/components/Geral/Cards';
import Grid from '@mui/material/Grid2'

const InicioUsuarios: React.FC = () => {
  const actions = [
    {
      icon: Search,
      title: 'Procurar Usuário',
      description: 'Pesquise e visualize informações sobre os usuários cadastrados',
      link: '/usuarios/procurar'
    },
    {
      icon: PersonAdd,
      title: 'Cadastrar Usuário',
      description: 'Adicione um novo usuário ao sistema da biblioteca',
      link: '/usuarios/cadastrar'
    },
    {
      icon: Security,
      title: 'Permissões',
      description: 'Gerencie as permissões de acesso dos usuários',
      link: '/usuarios/permissoes'
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
          Gerenciamento de Usuários
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

export default InicioUsuarios;