import {
    Box,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";

interface InputTypes {
    title: string,
    helper: string,
    placeholder: string
}

export default function InputText({title, helper, placeholder}: InputTypes) {

  const [helperText, setHelperText] = useState(false)

  const handlerHelperText = (value: boolean) => {
    setHelperText(!value)
  }

  return (
    <FormControl sx={{width: '100%'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1}}>
        <Typography sx={{fontWeight: 'bold', fontSize: 18}}>{title}</Typography>
        <HelpOutlineIcon
        onClick={() => handlerHelperText(helperText)}
        sx={{color: "#BEBEBE", cursor: 'pointer', '&:hover': {color: "#1E1E1E"}}}/>
      </Box>
      <TextField placeholder={placeholder}/>
      {helperText &&
      <FormHelperText sx={{fontSize: 14, color: '#1E1E1E'}}>{helper}</FormHelperText>
      }
    </FormControl>
  );
}
