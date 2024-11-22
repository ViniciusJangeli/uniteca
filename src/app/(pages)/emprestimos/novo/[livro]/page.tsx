"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { LibraryAdd } from "@mui/icons-material";
import { useQuery } from "react-query";
import api from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/components/Geral/Loading";
import Error from "@/app/components/Geral/Error";

interface Livro {
  id: string;
  titulo: string;
}

interface Usuario {
  id: string;
  nome: string;
}

const FazerEmprestimo: React.FC = () => {
  const { livro: idLivro } = useParams();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const hoje = new Date().toISOString().split("T")[0];
  const [dataDevolucao, setDataDevolucao] = useState("");

  const router = useRouter();

  const {
    isLoading: loadingLivros,
    error: errorLivros,
    data: livrosDisponiveis,
  } = useQuery("livrosDisponiveis", () =>
    api.get("/livros/disponiveis").then((res) => res.data.livros)
  );

  const {
    isLoading: loadingUsuarios,
    error: errorUsuarios,
    data: usuarios,
  } = useQuery("Todos os usuarios registrados no banco de dados", () =>
    api.get("/usuarios/consultar/todos").then((res) => res.data)
  );

  React.useEffect(() => {
    if (idLivro && livrosDisponiveis) {
      const livroSelecionado = livrosDisponiveis.find(
        (livro: Livro) => livro.id === idLivro
      );
      setLivro(livroSelecionado || null);
    }
  }, [idLivro, livrosDisponiveis]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.promise(
      api.post("/emprestimo/criar", {
        livroId: livro?.id,
        usuarioId: usuario?.id,
        hoje,
        dataDevolucao,
      }),
      {
        loading: "Registrando empréstimo...",
        success: (response) => {
          router.push("/emprestimos");
          return response.data.message;
        },
        error: (error) => {
          return (
            error.response?.data?.message || "Erro ao registrar empréstimo"
          );
        },
      }
    );
  };

  if (loadingLivros || loadingUsuarios) return <Loading/>;
  if (errorLivros || errorUsuarios) return <Error/>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ color: "#1D3557", mb: 4 }}
      >
        Fazer Empréstimo
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Autocomplete
          options={livrosDisponiveis}
          getOptionLabel={(option) => option.titulo}
          value={livro}
          onChange={(event, newValue) => setLivro(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Livro" required />
          )}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
        />

        <Autocomplete
          options={usuarios}
          getOptionLabel={(option) => option.nome}
          value={usuario}
          onChange={(event, newValue) => setUsuario(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Usuário" required />
          )}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
        />

        <TextField
          fullWidth
          label="Data de Empréstimo"
          type="date"
          value={hoje}
          InputLabelProps={{ shrink: true }}
          inputProps={{ readOnly: true }}
          required
        />

        <TextField
          fullWidth
          label="Data de Devolução"
          type="date"
          value={dataDevolucao}
          onChange={(e) => setDataDevolucao(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<LibraryAdd />}
          sx={{ bgcolor: "#0089B6", "&:hover": { bgcolor: "#005387" } }}
        >
          Registrar Empréstimo
        </Button>
      </Box>
    </Container>
  );
};

export default FazerEmprestimo;
