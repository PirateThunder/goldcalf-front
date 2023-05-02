import React from 'react'
import { TextField } from '@mui/material'

export default function TextFieldRounded(props: any) {
  return (
    <TextField {...props}
        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2) }, '& input': { paddingLeft: (theme) => theme.spacing(3.5) }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', }, }}
        //onChange={e => setEmail(e.target.value)}
    />
  )
}