'use client'

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Avatar
} from '@mui/material';
import { Person, Book, AttachMoney } from '@mui/icons-material';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
  dataCadastro: string;
}

interface Emprestimo {
  id: string;
  livroTitulo: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  status: string;
}

interface Multa {
  id: string;
  valor: number;
  motivo: string;
  dataPagamento: string;
}

const PerfilUsuario: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [multas, setMultas] = useState<Multa[]>([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const mockUsuario: Usuario = {
        id: '1',
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 99999-9999',
        tipo: 'Estudante',
        dataCadastro: '2022-01-15'
      };
      setUsuario(mockUsuario);

      const mockEmprestimos: Emprestimo[] = [
        { id: '1', livroTitulo: '1984', dataEmprestimo: '2023-01-15', dataDevolucao: '2023-01-29', status: 'Devolvido' },
        { id: '2', livroTitulo: 'Dom Quixote', dataEmprestimo: '2023-03-01', dataDevolucao: '2023-03-15', status: 'Devolvido' },
        { id: '3', livroTitulo: 'Cem Anos de Solidão', dataEmprestimo: '2023-05-01', dataDevolucao: '2023-05-15', status: 'Em andamento' },
      ];
      setEmprestimos(mockEmprestimos);

      const mockMultas: Multa[] = [
        { id: '1', valor: 5.00, motivo: 'Atraso na devolução', dataPagamento: '2023-02-05' },
        { id: '2', valor: 10.00, motivo: 'Livro danificado', dataPagamento: '2023-04-10' },
      ];
      setMultas(mockMultas);
    };

    fetchUserData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!usuario) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 100, height: 100, bgcolor: '#0089B6' }}>
              <Person sx={{ fontSize: 60 }} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1D3557' }}>
              {usuario.nome}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {usuario.email} | {usuario.telefone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {usuario.tipo} | Cadastrado em: {usuario.dataCadastro}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="user profile tabs">
          <Tab label="Histórico de Empréstimos" icon={<Book />} iconPosition="start" />
          <Tab label="Multas Pagas" icon={<AttachMoney />} iconPosition="start" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Livro</TableCell>
                <TableCell>Data de Empréstimo</TableCell>
                <TableCell>Data de Devolução</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emprestimos.map((emprestimo) => (
                <TableRow key={emprestimo.id}>
                  <TableCell>{emprestimo.livroTitulo}</TableCell>
                  <TableCell>{emprestimo.dataEmprestimo}</TableCell>
                  <TableCell>{emprestimo.dataDevolucao}</TableCell>
                  <TableCell>{emprestimo.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Motivo</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Data de Pagamento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {multas.map((multa) => (
                <TableRow key={multa.id}>
                  <TableCell>{multa.motivo}</TableCell>
                  <TableCell>R$ {multa.valor.toFixed(2)}</TableCell>
                  <TableCell>{multa.dataPagamento}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default PerfilUsuario;