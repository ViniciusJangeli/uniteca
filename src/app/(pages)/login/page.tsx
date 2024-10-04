'use client'
import Logo from "@/app/components/General/Logo";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form"; // Importação correta

type FormValues = {
    login: string;
    password: string;
};

export default function LoginScreen() {
    const { handleSubmit, register } = useForm<FormValues>(); // Registro de campos

    const onSubmit = (data: FormValues) => {
        console.log(data);
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
                        <span className="text-second_text"> UniTeca</span>
                        .
                    </Typography>
                </Box>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <TextField
                            placeholder="Digite seu CPF ou E-mail"
                            label="CPF/E-mail"
                            {...register("login")} // Registrar o campo no useForm
                        />
                        <TextField
                            placeholder="Digite sua Senha"
                            label="Senha"
                            type="password"
                            {...register("password")} // Registrar o campo no useForm
                        />
                        <Button type="submit" variant="contained" className="bg-primary_text hover:bg-second_text h-16">
                            <Typography className="text-3xl font-bold">
                                Entrar
                            </Typography>
                        </Button>
                    </form>
                    <Link href={'/'} className="flex items-center justify-end h-12">
                        <Typography className="text-second_text text-lg hover:text-primary_text">Esqueceu sua Senha?</Typography>
                    </Link>
                </Box>
            </Box>
        </section>
      </Box>
    );
}
