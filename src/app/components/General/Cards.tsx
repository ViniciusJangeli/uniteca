import { Box, Typography } from "@mui/material";
import Link from "next/link";


interface CardMenuProps {

    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

export default function CardMenu({icon, title, subtitle}: CardMenuProps) {

    return (
        <Link href={'/books/create-book'}>
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            height: 380,
            width: 350,
            p: 2, 
            borderRadius: 5, 
            bgcolor: '#FFF', 
            boxShadow: 5, 
            borderTop: '4px solid #0089B6', 
            borderBottom: '4px solid #0089B6',
            cursor: 'pointer',
            '&:hover': {
                borderTop: '6px solid #0089B6', 
                borderBottom: '6px solid #0089B6',
                position: 'relative',
                top: -3
            }
        }}

        >   
            {icon}
            <Box>
                <Typography sx={{textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 20, color: '#1D3557'}}>{title}</Typography>
                <Typography sx={{textAlign: 'center', fontSize: 14, color: '#A1A1A0'}}>{subtitle}</Typography>
            </Box>
        </Box>
        </Link>
    )
}