"use client"
import CardMenu from "@/app/components/General/Cards";
import { Box, Typography } from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export default function HomeUsers() {

    return (
        <Box>
            <Typography sx={{fontSize: 28, fontWeight: 'bold', color: '#1D3557', textAlign: 'center', mb: 10}}>Gerenciamento dos Usuários</Typography>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexWrap: 'wrap'}}>
                <CardMenu icon={<PersonSearchIcon sx={{width: 90, height: 90, color: "#005387"}}/>} title="Procurar Usuário" subtitle="Aqui você pode consultar todos os usuários registrados."/>
                <CardMenu icon={<PersonAddIcon sx={{width: 90, height: 90, color: "#005387"}}/>} title="Criar Usuário" subtitle="Aqui você pode registrar um novo usuário."/>
            </Box>
        </Box>
    )
}