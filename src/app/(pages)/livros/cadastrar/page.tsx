'use client'

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomInput from "@/app/components/Geral/CustomInput";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast'
import api from "@/utils/api";
import { useRouter } from "next/navigation";


export default function CadastroLivros() {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm()


  const onSubmit = async (data: object) => {
    toast.promise(
      api.post("/livros/criar", data), {
          loading: 'Carregando...',
          success: (response) => {
            router.push("/livros/consultar")
            return response.data.result.message
          },
          error: (error) => {
            console.log(error)
            return error.response.data.message
          }
        }
    );
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 'bold', color: "#1D3557"}}>
          Cadastro de Livros
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2, flexDirection: {xs: 'column', md: 'row'}}}>
              <CustomInput
                title="Título do Livro"
                placeholder="Ex: João e o Pé de Feijão"
                helperText="Insira o título completo do livro conforme aparece na capa."
                register={register('titulo', { required: true })}
                error={errors.titulo}
                typeInput='string'
              />
              <CustomInput
                title="Autor"
                placeholder="Ex: Benjamin Tabart"
                helperText="Insira o nome completo do autor principal."
                register={register('autor', { required: true })}
                error={errors.autor}
                typeInput='string'
              />
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2, flexDirection: {xs: 'column', md: 'row'}}}>
              <CustomInput
                title="Edição"
                placeholder="Ex: 1° Edição"
                helperText="Insira a edição do livro."
                register={register('edicao', { required: true })}
                error={errors.edicao}
                typeInput='number'
              />

              <CustomInput
                title="Ano de Publicação"
                placeholder="Ex: 1807"
                helperText="Insira o ano de publicação do livro."
                register={register('ano', { required: true })}
                error={errors.ano}
                typeInput='number'
              />
              <CustomInput
                title="Editora"
                placeholder="Ex: Editora Clássica"
                helperText="Insira a editora que fez a publicação do livro."
                register={register('editora', { required: true })}
                error={errors.editora}
                typeInput='string'
              />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2, flexDirection: {xs: 'column', md: 'row'}}}>

              <CustomInput
                title="Volume"
                placeholder="Ex: Volume 1"
                helperText="Insira o volume do livro."
                register={register('volume', { required: true })}
                error={errors.volume}
                typeInput='number'
              />
              <CustomInput
                title="Total de Páginas"
                placeholder="Ex: 32"
                helperText="Insira o total de páginas do livro."
                register={register('totalPaginas', { required: true })}
                error={errors.totalPaginas}
                typeInput='number'
              />
              <CustomInput
                title="Cópias em Acervo"
                placeholder="Ex: 5"
                helperText="Insira a quantidade de cópias que temos em acervo."
                register={register('totalExemplares', { required: true })}
                error={errors.totalExemplares}
                typeInput='number'
              />
              <CustomInput
                title="ISBN"
                placeholder="Ex: 978-3-16-148410-0"
                helperText="Insira o ISBN (International Standard Book Number) do livro."
                register={register('isbn', { required: true })}
                error={errors.isbn}
                typeInput='string'
              />
            </Box>

            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 4, width: '100%', fontSize: 22, bgcolor: '#005387', '&:hover': {bgcolor: "#005387CC"} }}>
              Cadastrar Livro
            </Button>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
