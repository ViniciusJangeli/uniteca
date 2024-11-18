"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Book as BookIcon,
  BookmarkAdded,
  LibraryBooks,
  MenuBook,
  PersonAdd,
  TrendingUp,
} from "@mui/icons-material";
import Link from "next/link";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  backgroundColor: "#005387",
  color: theme.palette.primary.contrastText,
}));

const QuickActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#0089B6",
  color: theme.palette.secondary.contrastText,
  "&:hover": {
    backgroundColor: "#005387",
  },
}));

export default function DashboardPage() {
  const totalExemplares = 1000;
  const exemplareEmprestados = 250;
  const exemplareDisponiveis = totalExemplares - exemplareEmprestados;

  const quickActions = [
    { icon: <MenuBook />, text: "Fazer Empréstimo", link: "/emprestimos/novo" },
    { icon: <BookIcon />, text: "Registrar Devolução", link: "/emprestimos/devolucao" },
    {
      icon: <BookmarkAdded />,
      text: "Consultar Disponibilidade",
      link: "/livros/disponibilidade",
    },
    {
      icon: <LibraryBooks />,
      text: "Cadastrar Livro",
      link: "/livros/cadastrar",
    },
    {
      icon: <PersonAdd />,
      text: "Cadastrar Usuário",
      link: "/usuarios/cadastrar",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Informações Importantes
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatCard sx={{cursor: 'pointer'}} elevation={3}>
              <BookIcon sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h5">{totalExemplares}</Typography>
                <Typography variant="subtitle1">Total de Exemplares</Typography>
              </Box>
            </StatCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard sx={{cursor: 'pointer'}} elevation={3}>
              <MenuBook sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h5">{exemplareEmprestados}</Typography>
                <Typography variant="subtitle1">Emprestados</Typography>
              </Box>
            </StatCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard sx={{cursor: 'pointer'}} elevation={3}>
              <BookmarkAdded sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h5">{exemplareDisponiveis}</Typography>
                <Typography variant="subtitle1">Disponíveis</Typography>
              </Box>
            </StatCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Ações Rápidas
              </Typography>
              <List>
                {quickActions.map((action, index) => (
                  <Link href={action.link} key={index}>
                    <ListItem disablePadding>
                      <QuickActionButton fullWidth startIcon={action.icon}>
                        {action.text}
                      </QuickActionButton>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Livros Mais Populares
              </Typography>
              <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  "Dom Quixote",
                  "1984",
                  "Cem Anos de Solidão",
                  "O Pequeno Príncipe",
                  "Crime e Castigo",
                ].map((book, index) => (
                  <ListItem
                    sx={{ border: "1px solid #005387", borderRadius: 2 }}
                    key={index}
                  >
                    <ListItemIcon>
                      <TrendingUp />
                    </ListItemIcon>
                    <ListItemText primary={book} />
                  </ListItem>
                ))}
              </List>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
