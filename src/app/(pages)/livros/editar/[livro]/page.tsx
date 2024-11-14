'use client'

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button
} from '@mui/material';
import { Edit } from '@mui/icons-material';

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  isbn: string;
  anoPublicacao: string;
  quantidade: number;
}

const EditarLivro: React.FC = () => {
  const [livro, setLivro] = useState<Livro>({
    id: '',
    titulo: '',
    autor: '',
    isbn: '',
    anoPublicacao: '',
    quantidade: 0
  });

  useEffect(() => {
    // Simulating API call to fetch book data
    const fetchLivro = async () => {
      // In a real application, you would fetch the book data based on an ID, perhaps from the URL
      const mockLivro: Livro = {
        id: '1',
        titulo: '1984',
        autor: 'George Orwell',
        isbn: '9780451524935',
        anoPublicacao: '1949',
        quantidade: 5
      };
      setLivro(mockLivro);
    };

    fetchLivro();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLivro(prevLivro => ({
      ...prevLivro,
      [name]: name === 'quantidade' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send this data to your backend
    console.log(livro);
    // Show success message or redirect
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Editar Livro
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          fullWidth
          label="Título"
          name="titulo"
          value={livro.titulo}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Autor"
          name="autor"
          value={livro.autor}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="ISBN"
          name="isbn"
          value={livro.isbn}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Ano de Publicação"
          name="anoPublicacao"
          value={livro.anoPublicacao}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Quantidade"
          name="quantidade"
          type="number"
          value={livro.quantidade}
          onChange={handleChange}
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<Edit />}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Atualizar Livro
        </Button>
      </Box>
    </Container>
  );
};

export default EditarLivro;