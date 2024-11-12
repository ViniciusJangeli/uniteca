"use client"
import CardMenu from "@/app/components/General/Cards";
import { Box, Typography } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

export default function HomeLoan() {

    return (
        <Box>
            <Typography sx={{fontSize: 28, fontWeight: 'bold', color: '#1D3557', textAlign: 'center', mt: 12, mb: 10}}>Gerenciamento dos Empréstimos</Typography>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexWrap: 'wrap'}}>
                <CardMenu icon={<BookIcon sx={{width: 90, height: 90, color: "#005387"}}/>} title="Consultar Empréstimo" subtitle="Aqui você pode consultar todos os empréstimos registrados."/>
                <CardMenu icon={<BookmarkAddIcon sx={{width: 90, height: 90, color: "#005387"}}/>} title="Registrar Empréstimo" subtitle="Aqui você pode registrar um novo empréstimo."/>
                <CardMenu icon={<BookmarkAddedIcon sx={{width: 90, height: 90, color: "#005387"}}/>} title="Registrar Devolução" subtitle="Aqui você pode registrar a devolução de."/>
            </Box>
        </Box>
    )
}