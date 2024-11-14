'use client'

import React, { useState } from 'react'
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
  Snackbar,
  Link,
  Grid
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form'
import api from "@/utils/api";
import toast from "react-hot-toast";


const theme = createTheme({
  palette: {
    primary: { main: '#0089B6' },
    secondary: { main: '#1D3557' },
    background: { default: '#FBFBFB' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { borderColor: '#0089B6', borderWidth: 2, borderStyle: 'solid' },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: { backgroundColor: '#0089B6', color: 'white' },
      },
    },
  },
})

interface FormValues {
  email: string
  password: string
}

export default function LoginPage() {

  const { handleSubmit, register, formState: { errors } } = useForm<FormValues>()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorLogin, setErrorLogin] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const router = useRouter()

  const handleErrorLogin = () => {
    setErrorLogin(true)
  }

  router.push('/inicio')

  const onSubmit = async (data: FormValues) => {
    toast.promise(
      api.post("/auth/login", data).then((res) => {
        if (res.data && res.data.token) {
          const token = res.data.token
          localStorage.setItem("token", token)
          router.push("/inicio")
          return "Login bem-sucedido!"
        } else {
          throw new Error("Seu CPF/e-mail e/ou senha estão incorretos!")
        }
      }),
      {
        loading: "Carregando...",
        success: (message) => message,
        error: (err) => {
          handleErrorLogin()
          return err.response?.data.message || "Erro ao fazer login"
        },
      }
    )
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setOpenSnackbar(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Imagem Lateral */}
        <Grid item xs={0} md={6} position="relative">
          <Image
            src='/bg-login.png'
            alt="Library Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 137, 182, 0.1)',
              display: { xs: 'none', md: 'block' }
            }}
          />
        </Grid>

        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 4,
            bgcolor: 'background.default',
            p: 3
          }}
        >
          <Image src="/images/Logo.svg" alt="Logo Uniteca" width={350} height={250} />
          <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, border: 'none' }}>
            <CardHeader
              title="Login"
              subheader="Entre com sua conta para acessar o sistema"
              titleTypographyProps={{ align: 'center', variant: 'h5', fontWeight: 'bold' }}
              subheaderTypographyProps={{ align: 'center', color: 'white' }}
            />
            <CardContent>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  autoFocus
                  {...register("email", { required: "Email é obrigatório" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register("password", { required: "Senha é obrigatória" })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Link href="#" variant="body2" color="primary">
                    Esqueceu sua senha?
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Login realizado com sucesso"
      />
    </ThemeProvider>
  )
}
