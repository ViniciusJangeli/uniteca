import { Box, Typography } from "@mui/material";


export default function Logo() {
    return (
      <Box className="flex flex-col items-center select-none">
        <Typography className="font-bold text-8xl">
          <span className="text-primary_text">Uni</span>
          <span className="text-second_text">Teca</span>
        </Typography>
        <Typography className="font-bold text-second_text uppercase text-sm">Controle e gerenciamento para bibliotecas</Typography>
      </Box>
    );
  }
  