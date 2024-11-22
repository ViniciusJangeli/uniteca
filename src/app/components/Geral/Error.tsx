import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({ message = "Ocorreu um erro. Por favor, tente novamente.", onRetry }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          bgcolor: 'error.light'
        }}
      >
        <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ color: 'error.main' }}>
          Erro
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          {message}
        </Typography>
        {onRetry && (
          <Button 
            variant="contained" 
            onClick={onRetry}
            sx={{ 
              bgcolor: '#0089B6', 
              '&:hover': { bgcolor: '#005387' }
            }}
          >
            Tentar Novamente
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default Error;