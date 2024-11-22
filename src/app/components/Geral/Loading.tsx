import React from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Carregando..." }) => {
  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '50vh' 
      }}
    >
      <CircularProgress 
        size={64} 
        thickness={4} 
        sx={{ 
          color: '#0089B6',
          mb: 2
        }} 
      />
      <Typography variant="h6" component="h1" align="center" sx={{ color: '#1D3557' }}>
        {message}
      </Typography>
    </Container>
  );
};

export default Loading;