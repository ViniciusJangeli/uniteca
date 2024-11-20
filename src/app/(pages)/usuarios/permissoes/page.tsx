'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Paper,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useQuery } from 'react-query';
import api from '@/utils/api';

interface Permissao {
  id: string;
  titulo: string;
}

interface Subpermissao {
  descricao: string;
  id: string;
}

const Permissoes: React.FC = () => {

  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [subpermissoes, setSubpermissoes] = useState<Subpermissao[]>([]);
  const [relacaoSubpermissoes, setRelacaoSubpermissoes] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [novaPermissao, setNovaPermissao] = useState<Permissao>({ id: '', titulo: '' });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletePermissaoId, setDeletePermissaoId] = useState<string>('');

  const { isLoading, error, refetch } = useQuery<Permissao[]>(['Todas as Permissoes Cadastradas no Banco de dados'], () =>
    api.get('/permissoes/consultar/permissoes').then((res) => res.data),
    {
      onSuccess: (data) => setPermissoes(data),
    }
  );

  useEffect(() => {
    const fetchSubpermissoes = async () => {
      try {
        const response = await api.get('/permissoes/consultar/subpermissoes');
        setSubpermissoes(response.data);
      } catch (err) {
        console.error('Erro ao buscar subpermissões:', err);
      }
    };
    fetchSubpermissoes();
  }, []);

  const handleOpenDialog = async (permissao?: Permissao) => {
    setNovaPermissao(permissao || { id: '', titulo: '' });
    setOpenDialog(true);

    if (permissao) {
      try {
        const response = await api.get(`/permissoes/consultar/relacao/${permissao.id}`);
        setRelacaoSubpermissoes(response.data.map((sub: Subpermissao) => sub.id));
      } catch (err) {
        console.error('Erro ao buscar relação de subpermissões:', err);
      }
    } else {
      setRelacaoSubpermissoes([]);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovaPermissao(prev => ({ ...prev, [name]: value }));
  };

  const handleSubpermissaoToggle = (id: string) => {
    setRelacaoSubpermissoes((prev) =>
      prev.includes(id) ? prev.filter((subId) => subId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    try {
      if (novaPermissao.id) {
        await api.put(`/permissoes/editar/${novaPermissao.id}`, {
          titulo: novaPermissao.titulo,
          subpermissoes: relacaoSubpermissoes,
        });
        setPermissoes((prev) =>
          prev.map((p) => (p.id === novaPermissao.id ? novaPermissao : p))
        );
      } else {
        const response = await api.post('/permissoes/criar', {
          titulo: novaPermissao.titulo,
          subpermissoes: relacaoSubpermissoes,
        });
        setPermissoes((prev) => [...prev, response.data]);
      }

      await refetch();
    } catch (err) {
      console.error('Erro ao salvar permissão:', err);
    }
    handleCloseDialog();
  };

  const handleDeleteDialogOpen = (id: string) => {
    setDeletePermissaoId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeletePermissaoId('');
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/permissoes/excluir/${deletePermissaoId}`);
      setPermissoes((prev) => prev.filter((p) => p.id !== deletePermissaoId));
      await refetch(); 
    } catch (err) {
      console.error('Erro ao deletar permissão:', err);
    }
    handleDeleteDialogClose();
  };

  if (isLoading) return <>Carregando permissões...</>;
  if (error) return <>Erro ao carregar permissões...</>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Gerenciar Permissões
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Adicionar Nova Permissão
        </Button>
      </Box>
      <Grid container spacing={3}>
        {permissoes.map((permissao) => (
          <Grid item xs={12} sm={6} md={4} key={permissao.id}>
            <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {permissao.titulo}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <IconButton onClick={() => handleOpenDialog(permissao)} size="small">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteDialogOpen(permissao.id)} size="small">
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Modal de Confirmação de Deletação */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Você tem certeza que deseja excluir esta permissão?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancelar</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Adicionar/Editar Permissão */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{novaPermissao.id ? 'Editar Permissão' : 'Adicionar Nova Permissão'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="titulo"
            label="Título da Permissão"
            type="text"
            fullWidth
            variant="outlined"
            value={novaPermissao.titulo}
            onChange={handleInputChange}
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Subpermissões
          </Typography>
          <FormGroup>
            {subpermissoes.map((sub) => (
              <FormControlLabel
                key={sub.id}
                control={
                  <Checkbox
                    checked={relacaoSubpermissoes.includes(sub.id)}
                    onChange={() => handleSubpermissaoToggle(sub.id)}
                  />
                }
                label={sub.descricao}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}>
            {novaPermissao.id ? 'Atualizar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Permissoes;
