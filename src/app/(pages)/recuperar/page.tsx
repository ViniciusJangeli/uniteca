'use client'

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import { LockReset } from '@mui/icons-material';
import Image from 'next/image';
import api from '@/utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const RecuperarSenha: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [userId, setUserId] = useState<string | null>(null); 
  const [error, setError] = useState('');
  const router = useRouter()

  const handleNext = async () => {
    setError('');
    if (activeStep === 0) {
      
      try {
        const { data } = await api.post('/auth/verificar', { email, cpf });
        console.log(data)
        if (data && data.id) {
          
          setUserId(data.id);
          toast.success('Verificação bem-sucedida!');
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          toast.error('Email ou CPF inválidos. Por favor, tente novamente.');
        }
      } catch {
        toast.error('Erro ao verificar os dados. Tente novamente.');
      }
    } else if (activeStep === 1) {
      
      if (novaSenha === confirmarSenha) {
        try {
          if (userId) {
            await api.post('/auth/nova/senha', { userId, newPassword: novaSenha });
            toast.success('Senha atualizada com sucesso!');
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          } else {
            toast.error('Erro ao atualizar a senha. Usuário não encontrado.');
          }
        } catch {
          toast.error('Erro ao atualizar a senha. Tente novamente.');
        }
      } else {
        toast.error('As senhas não coincidem. Por favor, tente novamente.');
      }
    }
  };

  const steps = ['Verificação', 'Nova Senha', 'Concluído'];

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Image
          src="/images/Logo.svg"
          alt="Logo Uniteca"
          width={350}
          height={250}
        />
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1D3557', mb: 4 }}>
          Recuperar Senha
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, width: '100%' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
          {activeStep === 0 && (
            <>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="CPF"
                variant="outlined"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </>
          )}
          {activeStep === 1 && (
            <>
              <TextField
                fullWidth
                label="Nova Senha"
                variant="outlined"
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Confirmar Nova Senha"
                variant="outlined"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
            </>
          )}
          {activeStep === 2 && (
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <Typography variant="h6" align="center" sx={{ color: 'success.main' }}>
              Sua senha foi redefinida com sucesso!
            </Typography>
            <Button onClick={() => router.push('/')} variant='contained'>Ir para o Login</Button>
            </Box>
          )}
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          {activeStep < 2 && (
            <Button
              type="submit"
              variant="contained"
              startIcon={<LockReset />}
              onClick={handleNext}
              sx={{
                bgcolor: '#0089B6',
                '&:hover': { bgcolor: '#005387' },
                alignSelf: 'flex-end',
                mt: 2
              }}
            >
              {activeStep === 0 ? 'Verificar' : 'Redefinir Senha'}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default RecuperarSenha;
