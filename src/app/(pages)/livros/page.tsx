'use client'

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { LibraryBooks, Search, BookmarkAdded,} from '@mui/icons-material';
import ActionCard from '@/app/components/Geral/Cards';
import Grid from '@mui/material/Grid2'

const InicioLivros: React.FC = () => {
  const actions = [
    {
      icon: LibraryBooks,
      title: 'Cadastrar Livro',
      description: 'Adicione um novo livro ao catálogo da biblioteca',
      link: '/livros/cadastrar'
    },
    {
      icon: Search,
      title: 'Consultar Livro',
      description: 'Pesquise e visualize informações sobre os livros cadastrados',
      link: '/livros/consultar'
    },
    {
      icon: BookmarkAdded,
      title: 'Consultar Disponibilidade',
      description: 'Verifique a disponibilidade de um livro para empréstimo',
      link: '/livros/disponibilidade'
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
          Sistema de Gerenciamento da Biblioteca
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

export default InicioLivros;