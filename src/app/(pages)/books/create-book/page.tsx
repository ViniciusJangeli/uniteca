"use client"
import InputText from "@/app/components/General/InputText";
import { Box, Typography } from "@mui/material";



export default function CreateBook() {

    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <Typography sx={{fontSize: 28, fontWeight: 'bold', color: '#1D3557', textAlign: 'center', mb: 4}}>Cadastrar novo Exemplar</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, width: "50%"}}>
               
               <InputText title="Título do Exemplar" placeholder="Ex: João e o Pé de Feijão" helper="Aqui você deve colocar o título do exemplar. Ex: 'João e o Pé de Feijão'"/>
               <InputText title="Autor" placeholder="Ex: João e o Pé de Feijão" helper="Aqui você deve colocar o nome do exemplar. Ex: 'João e o Pé de Feijão'"/>
               <InputText title="Edição" placeholder="Ex: João e o Pé de Feijão" helper="Aqui você deve colocar o nome do exemplar. Ex: 'João e o Pé de Feijão'"/>
               <InputText title="Ano de Publicação" placeholder="Ex: João e o Pé de Feijão" helper="Aqui você deve colocar o nome do exemplar. Ex: 'João e o Pé de Feijão'"/>
               <InputText title="Editora" placeholder="Ex: João e o Pé de Feijão" helper="Aqui você deve colocar o nome do exemplar. Ex: 'João e o Pé de Feijão'"/>
               <InputText title="Volume" placeholder="Ex: João e o Pé de Feijão" helper="Aqui você deve colocar o nome do exemplar. Ex: 'João e o Pé de Feijão'"/>
               <InputText title="Total de Páginas" placeholder="Ex: João e o Pé de Feijão" helper="Aqui você deve colocar o nome do exemplar. Ex: 'João e o Pé de Feijão'"/>
               <InputText title="Total de Cópias" placeholder="Ex: João e o Pé de Feijão" helper="Aqui você deve colocar o nome do exemplar. Ex: 'João e o Pé de Feijão'"/>
               <InputText title="ISBN" placeholder="Ex: João e o Pé de Feijão" helper="Aqui você deve colocar o nome do exemplar. Ex: 'João e o Pé de Feijão'"/>

            </Box>
        </Box>
    )
}