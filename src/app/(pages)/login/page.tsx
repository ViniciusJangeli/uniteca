"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
  InputAdornment,
  Link,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import api from "@/utils/api";
import toast from "react-hot-toast";

const theme = createTheme({
  palette: {
    primary: { main: "#0089B6" },
    secondary: { main: "#1D3557" },
    background: { default: "#FBFBFB" },
  },
});

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", data);
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        const decodedToken = JSON.parse(atob(res.data.token.split('.')[1])); 
        localStorage.setItem("userId", decodedToken.userId); 
        toast.success("Login bem-sucedido!");
        router.push("/inicio");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item xs={0} md={6} position="relative">
          <Image
            src="/bg-login.png"
            alt="Library Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 137, 182, 0.1)",
              display: { xs: "none", md: "block" },
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
            bgcolor: "background.default",
            p: 3,
          }}
        >
          <Image
            src="/images/Logo.svg"
            alt="Logo Uniteca"
            width={350}
            height={250}
          />
          <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
            <CardHeader
              title="Login"
              subheader="Entre com sua conta para acessar o sistema"
              titleTypographyProps={{
                align: "center",
                variant: "h5",
                fontWeight: "bold",
                color: "#0089B6",
              }}
              subheaderTypographyProps={{ align: "center", color: "#0089B6" }}
            />
            <CardContent>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  autoFocus
                  {...register("email", { required: "Campo obrigatório" })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", { required: "Campo obrigatório" })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Lembrar-me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <Link href="/recuperar" variant="body2" color="primary">
                    Esqueceu sua senha?
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
