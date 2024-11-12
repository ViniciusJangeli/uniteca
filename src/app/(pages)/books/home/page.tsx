"use client"
import CardMenu from "@/app/components/General/Cards";
import { Box, Typography } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

export default function HomeBooks() {

    return (
        <Box>
            <Typography sx={{fontSize: 28, fontWeight: 'bold', color: '#1D3557', textAlign: 'center', mb: 10}}>Gerenciamento dos Livros</Typography>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexWrap: 'wrap'}}>
                <CardMenu icon={<BookIcon sx={{width: 90, height: 90, color: "#005387"}}/>} title="Consultar Livros" subtitle="Aqui você pode consultar todos os livros registrados."/>
                <CardMenu icon={<BookmarkAddIcon sx={{width: 90, height: 90, color: "#005387"}}/>} title="Cadastrar Livro" subtitle="Aqui você pode adicionar um novo exemplar em nosso acervo."/>
                <CardMenu icon={<BookmarkAddedIcon sx={{width: 90, height: 90, color: "#005387"}}/>} title="Verificar Disponibilidade" subtitle="Aqui você pode verificar se um exemplar esta disponível."/>
            </Box>
        </Box>
    )
}