'use client'

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button
} from '@mui/material';
import { Security } from '@mui/icons-material';

interface Permissao {
  id: string;
  nome: string;
  checked: boolean;
}

const Permissoes: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [permissoes, setPermissoes] = useState<Permissao[]>([
    { id: 'cadastrar_livro', nome: 'Cadastrar Livro', checked: false },
    { id: 'emprestar_livro', nome: 'Emprestar Livro', checked: false },
    { id: 'cadastrar_usuario', nome: 'Cadastrar Usuário', checked: false },
    { id: 'gerenciar_permissoes', nome: 'Gerenciar Permissões', checked: false },
  ]);

  const handleUsuarioChange = (event: SelectChangeEvent) => {
    setUsuario(event.target.value as string);
    // Here you would typically fetch the user's permissions from the backend
    // and update the permissoes state accordingly
  };

  const handlePermissaoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPermissoes = permissoes.map(permissao => 
      permissao.id === event.target.name ? { ...permissao, checked: event.target.checked } : permissao
    );
    setPermissoes(updatedPermissoes);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the updated permissions to your backend
    console.log({ usuario, permissoes });
    // Show success message
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Gerenciar Permissões
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="usuario-select-label">Usuário</InputLabel>
          <Select
            labelId="usuario-select-label"
            id="usuario-select"
            value={usuario}
            label="Usuário"
            onChange={handleUsuarioChange}
          >
            <MenuItem value="1">João Silva</MenuItem>
            <MenuItem value="2">Maria Santos</MenuItem>
            <MenuItem value="3">Pedro Oliveira</MenuItem>
          </Select>
        </FormControl>
        <FormGroup>
          {permissoes.map((permissao) => (
            <FormControlLabel
              key={permissao.id}
              control={
                <Checkbox
                  checked={permissao.checked}
                  onChange={handlePermissaoChange}
                  name={permissao.id}
                />
              }
              label={permissao.nome}
            />
          ))}
        </FormGroup>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<Security />}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Atualizar Permissões
        </Button>
      </Box>
    </Container>
  );
};

export default Permissoes;