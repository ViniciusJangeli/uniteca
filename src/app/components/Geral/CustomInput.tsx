'use client'

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  FormControl, 
  FormHelperText,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FieldError, UseFormRegisterReturn, FieldErrorsImpl, Merge  } from 'react-hook-form';
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  },
})

const StyledFormControl = styled(FormControl)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

const StyledHelperText = styled(FormHelperText)({
  fontSize: 14,
  textAlign: 'center',
  backgroundColor: "#0089B6",
  color: '#F3F3F3',
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
});

interface CustomInputProps {
  title: string;
  placeholder: string;
  helperText: string;
  register: UseFormRegisterReturn;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
  typeInput: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ title, placeholder, helperText, register, error, typeInput }) => {
  const [helper, setHelper] = useState(false);
  const classes = useStyles()

  const handlerHelperText = (value: boolean) => {
    setHelper(!value);
  };

  return (
    <StyledFormControl>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Typography>
        <HelpOutlineIcon
          onClick={() => handlerHelperText(helper)}
          sx={{ color: "#BEBEBE", cursor: 'pointer', '&:hover': { color: "#1E1E1E" } }}
        />
      </Box>
      <TextField sx={{ width: '100%' }} placeholder={placeholder} {...register} type={typeInput} className={typeInput === 'number' ? classes.input : undefined}/>
      {helper && <StyledHelperText>{helperText}</StyledHelperText>}
      {error && <Alert variant='outlined' severity='error' sx={{width: '100%'}}>Este campo é obrigatório!</Alert>}
    </StyledFormControl>
  );
};

export default CustomInput;