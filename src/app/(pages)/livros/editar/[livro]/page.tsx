'use client'

import React from 'react';
import { Container, Typography, Grid, Button, TextField, CircularProgress } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import api from '@/utils/api';

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  edicao: number;
  editora: string;
  volume: number;
  totalPaginas: number;
  totalExemplares: number;
}

const EditarLivro: React.FC = () => {
  const { livro } = useParams();
  const router = useRouter();

  const { isLoading, error, data } = useQuery<Livro>(['Obtendo dados de um livro especifico', livro], 
    () => api.get(`/livros/informacoes/${livro}`).then((res) => res.data)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Livro>();


  const onSubmit = async (data: Livro) => {
    const formData = {
      ...data,
      id: livro,
    }
    toast.promise(
      api.put(`/livros/atualizar/${livro}`, formData), {
        loading: 'Atualizando...',
        success: (response) => {
          router.push("/livros/consultar");
          return response.data.message;
        },
        error: (error) => {
          return error.response.data.error;
        }
      }
    );
  };

  if (isLoading) return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Carregando...
      </Typography>
      <CircularProgress />
    </Container>
  );

  if (error) return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Erro ao carregar os dados do livro
      </Typography>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Editar Livro
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Título ocupa duas colunas */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título"
              defaultValue={data?.titulo}
              {...register('titulo', { required: 'Título é obrigatório' })}
              error={!!errors.titulo}
              helperText={errors.titulo ? errors.titulo.message : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Autor"
              defaultValue={data?.autor}
              {...register('autor', { required: 'Autor é obrigatório' })}
              error={!!errors.autor}
              helperText={errors.autor ? errors.autor.message : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ISBN"
              defaultValue={data?.isbn}
              {...register('isbn', { required: 'ISBN é obrigatório' })}
              error={!!errors.isbn}
              helperText={errors.isbn ? errors.isbn.message : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ano de Publicação"
              defaultValue={data?.ano}
              type='number'
              {...register('ano', { required: 'Ano de publicação é obrigatório'})}
              error={!!errors.ano}
              helperText={errors.ano ? errors.ano.message : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edição"
              defaultValue={data?.edicao}
              type='number'
              {...register('edicao', { required: 'Edição é obrigatória' })}
              error={!!errors.edicao}
              helperText={errors.edicao ? errors.edicao.message : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Volume"
              type='number'
              defaultValue={data?.volume}
              {...register('volume', { required: 'Volume é obrigatório' })}
              error={!!errors.volume}
              helperText={errors.volume ? errors.volume.message : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Editora"
              defaultValue={data?.editora}
              {...register('editora', { required: 'Editora é obrigatória' })}
              error={!!errors.editora}
              helperText={errors.editora ? errors.editora.message : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              defaultValue={data?.totalPaginas}
              label="Total de Páginas"
              type='number'
              {...register('totalPaginas', { required: 'Total de páginas é obrigatório' })}
              error={!!errors.totalPaginas}
              helperText={errors.totalPaginas ? errors.totalPaginas.message : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantidade de Exemplares"
              type="number"
              defaultValue={data?.totalExemplares}
              {...register('totalExemplares', { required: 'Quantidade de exemplares é obrigatória' })}
              error={!!errors.totalExemplares}
              helperText={errors.totalExemplares ? errors.totalExemplares.message : ''}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 4, width: '100%' }} startIcon={<Edit />}>
          Atualizar Livro
        </Button>
      </form>
    </Container>
  );
};

export default EditarLivro;
