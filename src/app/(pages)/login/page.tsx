"use client";
import Logo from "@/app/components/General/Logo";
import api from "@/utils/api";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormValues = {
  login: string;
  password: string;
};

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const [errorLogin, setErrorLogin] = useState(false);

  const handleErrorLogin = () => {
    setErrorLogin(true);
  };

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    toast.promise(
      api.post("/auth/login", data).then((res) => {
        if (res.data && res.data.token) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          router.push("/home");
          return "Login bem-sucedido!";
        } else {
          throw new Error("Seu CPF/e-mail e/ou senha estão incorretos!");
        }
      }),
      {
        loading: "Carregando...",
        success: (message) => message,
        error: (err) => {
          handleErrorLogin();
          return err.response?.data.message || "Erro ao fazer login";
        },
      }
    );
  };

  return (
    <Box className="flex">
      <Box className="relative w-3/5 h-screen bg-cover bg-center bg-[url('/images/bg-login.png')]">
        <Box className="absolute inset-0 bg-[#0089B633]"></Box>
      </Box>

      <section className="h-screen w-2/5 flex flex-col items-center justify-center gap-12">
        <Logo />
        <Box className="flex flex-col gap-4">
          <Box>
            <Typography className="text-primary_text text-xl">
              Entre com seu
              <span className="text-second_text"> CPF ou E-mail </span>
              cadastrado na
              <span className="text-second_text"> UniTeca</span>.
            </Typography>
          </Box>
          <Box>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <TextField
                placeholder="Digite seu CPF ou E-mail"
                label="CPF/E-mail"
                required
                error={!!errors.login}
                helperText={errors.login ? "Este campo é obrigatório" : ""}
                {...register("login", { required: true })}
              />
              <TextField
                placeholder="Digite sua Senha"
                label="Senha"
                type="password"
                required
                error={!!errors.password}
                helperText={errors.password ? "Este campo é obrigatório" : ""}
                {...register("password", { required: true })}
              />
              {errorLogin && <Alert variant="filled" severity="error">Seu CPF/e-mail e/ou senha estão incorretos!</Alert>}
              <Button
                type="submit"
                variant="contained"
                className="bg-primary_text hover:bg-second_text h-16"
              >
                <Typography className="text-3xl font-bold">Entrar</Typography>
              </Button>
            </form>

            <Link href={"/"} className="flex items-center justify-end h-12">
              <Typography className="text-second_text text-lg hover:text-primary_text">
                Esqueceu sua Senha?
              </Typography>
            </Link>
          </Box>
        </Box>
      </section>
    </Box>
  );
}
