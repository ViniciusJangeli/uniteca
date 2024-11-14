'use client'

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomInput from '@/app/components/Geral/CustomInput';

// Componente estilizado para o status do livro
const StatusBadge = styled(Typography)<{ disponivel: boolean }>(({ theme, disponivel }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'bold',
  backgroundColor: disponivel ? '#4caf50' : '#f44336',
  color: 'white',
  display: 'inline-block',
}));

// Dados de exemplo para os livros
const livros = [
  { id: 1, titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', disponivel: true },
  { id: 2, titulo: '1984', autor: 'George Orwell', disponivel: false },
  { id: 3, titulo: 'Cem Anos de Solidão', autor: 'Gabriel García Márquez', disponivel: true },
  { id: 4, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', disponivel: false },
  { id: 5, titulo: 'Crime e Castigo', autor: 'Fiódor Dostoiévski', disponivel: true },
];

export default function ConsultaDisponibilidade() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof livros>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const results = livros.filter(livro => 
      livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      livro.autor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Consulta de Disponibilidade
        </Typography>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} md={9}>
              <CustomInput
                title="Pesquisar Livro"
                placeholder="Digite o título ou autor do livro"
                helperText="Pesquise por título ou autor para verificar a disponibilidade."
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleSearch}
                sx={{ 
                  bgcolor: '#0089B6', 
                  '&:hover': { bgcolor: '#005387' },
                  height: '56px'  // Para alinhar com o CustomInput
                }}
              >
                Pesquisar
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {hasSearched && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Resultados da Pesquisa
            </Typography>
            {searchResults.length > 0 ? (
              <Grid container spacing={3}>
                {searchResults.map((livro) => (
                  <Grid item xs={12} sm={6} key={livro.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {livro.titulo}
                        </Typography>
                        <Typography color="text.secondary">
                          {livro.autor}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <StatusBadge disponivel={livro.disponivel}>
                            {livro.disponivel ? 'Disponível' : 'Indisponível'}
                          </StatusBadge>
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          color="primary"
                          disabled={!livro.disponivel}
                        >
                          {livro.disponivel ? 'Fazer Empréstimo' : 'Indisponível'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>Nenhum livro encontrado. Tente outra pesquisa.</Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}