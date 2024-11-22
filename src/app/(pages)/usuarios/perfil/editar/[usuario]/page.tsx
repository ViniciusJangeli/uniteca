"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useQuery } from "react-query";
import api from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/components/Geral/Loading";
import Error from "@/app/components/Geral/Error";

interface Usuario {
  cpf: string;
  id: string;
  nome: string;
  email: string;
  telefone: string;
  permissaoId: string;
}

const EditarUsuario: React.FC = () => {
  const { usuario: id } = useParams();
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    permissaoId: "",
  });

  const {
    isLoading: loadingPermissoes,
    error: errorPermissoes,
    data: permissoes,
  } = useQuery(
    "Todas as Permissoes Cadastradas no Banco de dados",
    async () => {
      const response = await api.get("/permissoes/consultar/permissoes");
      return response.data;
    }
  );

  const { isLoading, error } = useQuery(
    ["Consulta do perfil especifico do usuário", id],
    async () => {
      const response = await api.get(`/usuarios/consultar/${id}`);
      return response.data;
    },
    {
      enabled: !!id,
      onSuccess: (data) => {
        const formData = {
          ...data,
          permissaoId:
            data.permissoes[0]?.permissao?.permissoesRelacao[0]?.permissaoId,
        };
        setUsuario(formData);
      },
    }
  );

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast.promise(api.put(`/usuarios/editar/${id}`, usuario), {
      loading: "Atualizando usuário...",
      success: (response) => {
        router.push("/usuarios/procurar");
        return response.data.message || "Usuário atualizado com sucesso!";
      },
      error: (error) => {
        return error.response?.data?.message || "Erro ao atualizar o usuário";
      },
    });
  };

  if (isLoading || loadingPermissoes) return <Loading/>;
  if (error || errorPermissoes) return <Error/>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ color: "#1D3557", mb: 4 }}
      >
        Editar Usuário
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          fullWidth
          label="Nome"
          name="nome"
          value={usuario.nome}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={usuario.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="CPF"
          name="cpf"
          type="cpf"
          value={usuario.cpf}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Telefone"
          name="telefone"
          value={usuario.telefone}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="permissao-label">Tipo de Usuário</InputLabel>
          <Select
            labelId="permissao-label"
            id="permissao"
            name="permissaoId"
            value={usuario.permissaoId}
            label="Tipo de Usuário"
            onChange={(e) => {
              const { value } = e.target;
              setUsuario((prevUsuario) => ({
                ...prevUsuario,
                permissaoId: value,
              }));
            }}
            required
          >
            {permissoes.map((permissao: { id: string; titulo: string }) => (
              <MenuItem key={permissao.id} value={permissao.id}>
                {permissao.titulo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          startIcon={<Edit />}
          sx={{ bgcolor: "#0089B6", "&:hover": { bgcolor: "#005387" } }}
        >
          Atualizar Usuário
        </Button>
      </Box>
    </Container>
  );
};

export default EditarUsuario;
