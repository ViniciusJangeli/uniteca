"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { Edit, Portrait, Search } from "@mui/icons-material";
import { useQuery } from "react-query";
import api from "@/utils/api";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  dataRegistro: string;
}

const ProcurarUsuario: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const { isLoading, error, data } = useQuery<Usuario[]>(
    "Todos os usuarios registrados no banco de dados",
    () => api.get("/usuarios/consultar/todos").then((res) => res.data)
  );

  const filteredUsuarios = data?.filter((usuario) =>
    Object.values(usuario).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error...</>;

  const columns: GridColDef[] = [
    {
      field: "editar",
      type: "actions",
      headerName: "Ações",
      width: 100,
      getActions: (params) => [
        <Box key={params.row.id}>
          <GridActionsCellItem
            icon={<Portrait/>}
            label="Ver Perfil"
            onClick={() =>
              router.push(`/usuarios/perfil/${params.row.id}`)
            }
          />
          <GridActionsCellItem
            icon={<Edit />}
            label="Editar Perfil"
            onClick={() =>
              router.push(`/usuarios/perfil/editar/${params.row.id}`)
            }
          />
        </Box>,
      ],
    },
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "cpf", headerName: "CPF", width: 250 },
    { field: "telefone", headerName: "Telefone", width: 200 },
    { field: "criadoEm", headerName: "Data de Registro", width: 180 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ color: "#1D3557", mb: 4 }}
      >
        Procurar Usuário
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Buscar por Nome, Email ou CPF"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <Button
          variant="contained"
          startIcon={<Search />}
          sx={{ bgcolor: "#0089B6", "&:hover": { bgcolor: "#005387" } }}
        >
          Buscar
        </Button>
      </Box>

      {filteredUsuarios && filteredUsuarios.length > 0 && (
        <Paper sx={{ width: "100%", height: "60vh" }}>
          <DataGrid
            rows={filteredUsuarios}
            columns={columns}
            disableRowSelectionOnClick
            getRowId={(row) => row.id}
          />
        </Paper>
      )}
    </Container>
  );
};

export default ProcurarUsuario;
