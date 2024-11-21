'use client'

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Autocomplete, 
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { AssignmentReturn } from '@mui/icons-material';
import { useQuery } from 'react-query';
import api from '@/utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Usuario {
  id: string;
  nome: string;
}

interface Livro {
  titulo: string;
}

interface Emprestimo {
  livro: Livro;
  titulo: string;
  id: string;
  dataDevolucaoPrevista: string;
}

const RegistrarDevolucao: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [emprestimo, setEmprestimo] = useState<string>('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [valorMulta, setValorMulta] = useState<number | null>(null);  // valorMulta agora é opcional
  const [dataDevolucaoPrevista, setDataDevolucaoPrevista] = useState<string>('');
  const [mostrarMulta, setMostrarMulta] = useState<boolean>(false);
  const [valorTotalMulta, setValorTotalMulta] = useState<number>(0);

  const router = useRouter();

  const { data: usuarios } = useQuery('usuarios', () =>
    api.get('/usuarios/consultar/todos').then(res => res.data)
  );
  
  const { data: emprestimosUsuario } = useQuery(
    ['emprestimosUsuario', usuario?.id],
    () => api.get(`/emprestimo/usuario/${usuario?.id}`).then(res => res.data),
    { enabled: !!usuario }
  );

  useEffect(() => {
    if (emprestimosUsuario) {
      setEmprestimos(emprestimosUsuario);
    }
  }, [emprestimosUsuario]);

  useEffect(() => {
    if (emprestimo) {
      const emprestimoSelecionado = emprestimos.find(e => e.id === emprestimo);
      if (emprestimoSelecionado) {
        setDataDevolucaoPrevista(emprestimoSelecionado.dataDevolucaoPrevista);
      }
    }
  }, [emprestimo, emprestimos]);

  const handleDevolucao = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emprestimoSelecionado = emprestimos.find(e => e.id === emprestimo);
    if (emprestimoSelecionado) {
      const dataPrevista = new Date(emprestimoSelecionado.dataDevolucaoPrevista);
      const dataDevolucaoDate = new Date(dataDevolucao);

      if (dataDevolucaoDate > dataPrevista) {
        const diasVencidos = Math.floor((dataDevolucaoDate.getTime() - dataPrevista.getTime()) / (1000 * 3600 * 24));
        const valorMultaTotal = diasVencidos * (valorMulta || 0);  // Usando o valor da multa se existir

        toast.promise(
          api.post('/emprestimo/devolucao', {
            emprestimoId: emprestimo,
            usuarioId: usuario?.id,
            dataDevolucao,
            valorMulta: valorMultaTotal > 0 ? valorMultaTotal : undefined, // Envia a multa apenas se houver valor
          }),
          {
            loading: 'Registrando devolução...',
            success: (response) => {
              router.push('/emprestimos');
              return response.data.message;
            },
            error: (error) => {
              console.log(error)
              return error.response.data.message;
            },
          }
        );
      } else {
        toast.promise(
          api.post('/emprestimo/devolucao', {
            emprestimoId: emprestimo,
            usuarioId: usuario?.id,
            dataDevolucao,
          }),
          {
            loading: 'Registrando devolução...',
            success: (response) => {
              router.push('/emprestimos');
              return response.data.message;
            },
            error: (error) => {
              console.log(error)
              return error.response.data.message;
            },
          }
        );
      }
    }
  };

  const handleDataDevolucaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novaDataDevolucao = e.target.value;
    setDataDevolucao(novaDataDevolucao);

    const dataPrevista = new Date(dataDevolucaoPrevista);
    const dataDevolucaoDate = new Date(novaDataDevolucao);
    
    if (dataDevolucaoDate > dataPrevista) {
      setMostrarMulta(true);
      const diasVencidos = Math.floor((dataDevolucaoDate.getTime() - dataPrevista.getTime()) / (1000 * 3600 * 24));
      const valorMultaTotal = diasVencidos * (valorMulta || 0);
      setValorTotalMulta(valorMultaTotal); 
    } else {
      setMostrarMulta(false);
      setValorTotalMulta(0);
    }
  };

  const handleValorMultaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoValorMulta = parseFloat(e.target.value);
    setValorMulta(novoValorMulta);

    if (dataDevolucao) {
      const dataPrevista = new Date(dataDevolucaoPrevista);
      const dataDevolucaoDate = new Date(dataDevolucao);
      
      if (dataDevolucaoDate > dataPrevista) {
        const diasVencidos = Math.floor((dataDevolucaoDate.getTime() - dataPrevista.getTime()) / (1000 * 3600 * 24));
        const valorMultaTotal = diasVencidos * novoValorMulta;
        setValorTotalMulta(valorMultaTotal);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
        Registrar Devolução
      </Typography>
      <Box component="form" onSubmit={handleDevolucao} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Autocomplete
          options={usuarios || []}
          getOptionLabel={(option: Usuario) => option.nome}
          value={usuario}
          onChange={(event, newValue: Usuario | null) => setUsuario(newValue)}
          renderInput={(params) => <TextField {...params} label="Usuário" required />}
        />
        
        <FormControl fullWidth>
          <InputLabel id="emprestimo-select-label">Empréstimo</InputLabel>
          <Select
            labelId="emprestimo-select-label"
            id="emprestimo-select"
            value={emprestimo}
            label="Empréstimo"
            onChange={(e) => setEmprestimo(e.target.value)}
            disabled={!usuario}
          >
            {emprestimos.map((emprestimo) => (
              <MenuItem key={emprestimo.id} value={emprestimo.id}>
                {emprestimo.livro.titulo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {dataDevolucaoPrevista && (
          <TextField
            fullWidth
            label="Data de Devolução Prevista"
            type="text"
            value={new Date(dataDevolucaoPrevista).toLocaleDateString()}
            disabled
            sx={{ bgcolor: '#f0f0f0' }}
          />
        )}

        <TextField
          fullWidth
          label="Data de Devolução"
          type="date"
          value={dataDevolucao}
          onChange={handleDataDevolucaoChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        {mostrarMulta && (
          <>
            <TextField
              fullWidth
              label="Valor Multa Diária"
              type="number"
              value={valorMulta || ''}
              InputProps={{
                startAdornment: <span>R$</span>,
              }}
              onChange={handleValorMultaChange}
              required
            />
            <TextField
              fullWidth
              label="Valor Total da Multa"
              type="text"
              value={`R$ ${valorTotalMulta.toFixed(2)}`}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              sx={{ bgcolor: '#f0f0f0' }}
            />
          </>
        )}

        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<AssignmentReturn />}
          sx={{ bgcolor: '#0089B6', '&:hover': { bgcolor: '#005387' } }}
        >
          Registrar Devolução
        </Button>
      </Box>
    </Container>
  );
};

export default RegistrarDevolucao;
