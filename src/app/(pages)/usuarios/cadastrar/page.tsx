'use client';

import React, { useState } from 'react';
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
  SelectChangeEvent
} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { useQuery } from 'react-query';
import api from '@/utils/api';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Loading from '@/app/components/Geral/Loading';
import Error from '@/app/components/Geral/Error';

const CadastrarUsuario: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [permissaoId, setPermissaoId] = useState('');

  const router = useRouter()

  const { isLoading, error, data: permissoes } = useQuery('Todas as Permissoes Cadastradas no Banco de dados', () =>
    api.get('/permissoes/consultar/permissoes').then((res) => res.data)
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    toast.promise(
      api.post('/usuarios/criar', {
        nome,
        email,
        telefone,
        cpf,
        permissaoId
      }),
      {
        loading: 'Carregando...',
        success: (response) => {
          router.push('/usuarios/procurar');
          return response.data.message;
        },
        error: (error) => {
          return error.response?.data?.message || 'Erro desconhecido';
        }
      }
    );
  };

  if (isLoading) return <Loading/>;
  if (error) return <Error/>;


  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Cadastrar Usuário
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          fullWidth
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        
        <FormControl fullWidth>
          <InputLabel id="permissao-label">Tipo de Usuário</InputLabel>
          <Select
            labelId="permissao-label"
            id="permissao"
            value={permissaoId}
            label="Tipo de Usuário"
            onChange={(e: SelectChangeEvent) => setPermissaoId(e.target.value as string)}
            required
          >
            {permissoes.map((permissao: { id: string, titulo: string }) => (
              <MenuItem key={permissao.id} value={permissao.id}>
                {permissao.titulo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<PersonAdd />}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Cadastrar Usuário
        </Button>
      </Box>
    </Container>
  );
};

export default CadastrarUsuario;
