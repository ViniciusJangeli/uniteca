"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useQuery } from "react-query";
import api from "@/utils/api";

const StatusBadge = styled(Typography)<{ disponivel: boolean }>(
  ({ theme, disponivel }) => ({
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    fontWeight: "bold",
    backgroundColor: disponivel ? "#4caf50" : "#f44336",
    color: "white",
    display: "inline-block",
  })
);

interface Livro {
  id: string;
  titulo: string;
  autor: string;
}

interface Disponibilidade {
  disponivel: boolean;
  exemplaresDisponiveis: number;
}

export default function ConsultaDisponibilidade() {
  const [selectedLivro, setSelectedLivro] = useState<Livro | null>(null);
  const [disponibilidade, setDisponibilidade] =
    useState<Disponibilidade | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    data: livros,
    isLoading: livrosLoading,
    error: livrosError,
  } = useQuery("livros", () =>
    api.get("/livros/todos").then((res) => res.data)
  );

  const handleCheckAvailability = async (livroId: string) => {
    setLoading(true);
    try {
      const response = await api.post(
        `/livros/disponibilidade?livroId=${livroId}`
      );
      setDisponibilidade(response.data);
    } catch (error) {
      console.error("Erro ao verificar disponibilidade:", error);
    } finally {
      setLoading(false);
    }
  };

  if (livrosLoading) return <CircularProgress />;
  if (livrosError) return <Typography>Erro ao carregar livros</Typography>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Consulta de Disponibilidade
        </Typography>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Autocomplete
                options={livros || []}
                isOptionEqualToValue={(option: Livro, value) =>
                  option.id === value.id
                }
                getOptionLabel={(option) =>
                  `${option.titulo} - ${option.autor}`
                }
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {" "}
                    {/* Usar o id único como chave */}
                    {`${option.titulo} - ${option.autor}`}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecione um livro"
                    variant="outlined"
                  />
                )}
                onChange={(_, value) => {
                  setSelectedLivro(value);
                  if (value) handleCheckAvailability(value.id);
                }}
                loading={livrosLoading}
                loadingText="Carregando..."
                noOptionsText="Nenhum livro encontrado"
              />
            </Grid>
          </Grid>
        </Paper>

        {selectedLivro && disponibilidade && (
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {selectedLivro.titulo}
              </Typography>
              <Typography color="text.secondary">
                {selectedLivro.autor}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <StatusBadge disponivel={disponibilidade.disponivel}>
                  {disponibilidade.disponivel
                    ? `Disponível - ${disponibilidade.exemplaresDisponiveis} exemplares`
                    : "Indisponível"}
                </StatusBadge>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={!disponibilidade.disponivel}
              >
                {disponibilidade.disponivel
                  ? "Fazer Empréstimo"
                  : "Indisponível"}
              </Button>
            </CardActions>
          </Card>
        )}

        {loading && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
      </Container>
    </Box>
  );
}
