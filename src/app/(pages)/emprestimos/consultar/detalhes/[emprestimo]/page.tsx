'use client'

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Modal,
  Fade,
  Backdrop
} from "@mui/material";
import { useParams } from "next/navigation";
import { Assignment, AttachMoney, Book, Person } from '@mui/icons-material';
import { useQuery, useMutation } from 'react-query';
import api from '@/utils/api';  
import toast from 'react-hot-toast';
import Loading from '@/app/components/Geral/Loading';
import Error from '@/app/components/Geral/Error';

interface Emprestimo {
  id: string;
  livro: {
    titulo: string;
  };
  usuario: {
    nome: string;
  };
  dataEmprestimo: string;
  dataDevolucao: string;
  status: string;
  historicoMultas: {
    valorMulta: number;
    status: string;
  }[];
}

const DetalhesEmprestimo: React.FC = () => {
  const { emprestimo } = useParams();  

  const { isLoading, error, data, refetch } = useQuery(
    ['Detalhes de emprestimo unico', emprestimo],
    async () => {
      const response = await api.get(`/emprestimo/detalhes/${emprestimo}`);
      return response.data;
    },
    { 
      enabled: !!emprestimo,  
    }
  );

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const mutation = useMutation(
    async (valorPago: number) => {
      const response = await api.post(`/emprestimo/multa/pagar/${emprestimo}`, { valorPago });
      return response.data;
    },
    {
      onSuccess: () => {
        handleCloseModal();
        refetch();
        toast.success("Pagamento da multa realizado com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao pagar a multa. Tente novamente.");
      },
    }
  );

  const handlePagarMulta = () => {
    const valorMulta = dadosEmprestimo.historicoMultas[0].valorMulta;
    mutation.mutate(valorMulta);
  };

  if (isLoading) return <Loading/>;
  if (error) return <Error/>;

  const dadosEmprestimo = data as Emprestimo; 

  const multa = dadosEmprestimo.historicoMultas.length > 0 ? dadosEmprestimo.historicoMultas[0] : null;

  const dataEmprestimoFormatada = new Date(dadosEmprestimo?.dataEmprestimo).toLocaleDateString();
  const dataDevolucaoFormatada = new Date(dadosEmprestimo?.dataDevolucao).toLocaleDateString();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
          Detalhes do Empréstimo
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <Book sx={{ mr: 1, color: '#0089B6' }} />
              <Typography variant="h6">Livro: {dadosEmprestimo?.livro.titulo}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Person sx={{ mr: 1, color: '#0089B6' }} />
              <Typography variant="h6">Usuário: {dadosEmprestimo?.usuario.nome}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <Assignment sx={{ mr: 1, color: '#0089B6' }} />
              <Typography variant="body1">Data de Empréstimo: {dataEmprestimoFormatada}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Assignment sx={{ mr: 1, color: '#0089B6' }} />
              <Typography variant="body1">Data de Devolução: {dataDevolucaoFormatada}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: dadosEmprestimo?.status === 'Atrasado' ? 'error.main' : 'success.main' }}>
                Status: {dadosEmprestimo?.status}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {multa && multa.status !== "Pago" && (
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              startIcon={<AttachMoney />}
              onClick={handleOpenModal}
              sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
            >
              Pagar Multa: R$ {multa.valorMulta.toFixed(2)}
            </Button>
          </Box>
        )}
        {multa && multa.status === "Pago" && (
          <Box mt={3} display="flex" justifyContent="center">
            <Typography variant="h6" color="success.main">
              Multa Paga
            </Typography>
          </Box>
        )}
      </Paper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Confirmar Pagamento de Multa
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Valor da multa: R$ {multa?.valorMulta.toFixed(2)}
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handlePagarMulta}
                sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
              >
                Confirmar Pagamento
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default DetalhesEmprestimo;
