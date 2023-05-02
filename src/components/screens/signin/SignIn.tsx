import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/components/screens/SignIn.module.css'
import { Box, Card, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from '@mui/material'
import { Grid } from '@mui/material'
import React from 'react'
import * as API from "@/helpers/api"
import Router, { useRouter } from 'next/router'
import { root } from 'postcss'

const inter = Inter({ subsets: ['latin'], weight: ['600'] })

export default function SignIn() {
  const [email, setEmail] : [string, React.Dispatch<React.SetStateAction<string>>] = React.useState('')
  const [code, setCode] : [string, React.Dispatch<React.SetStateAction<string>>] = React.useState('')

  const [emailButtonTitle, setEmailButtonTitle] : any = React.useState('Отправить код')
  const [signButtonTitle, setSignButtonTitle] : any = React.useState('Подтвердить код: введите 1111')

  const router = useRouter()

  const handleSendCode = async () => {
    setEmailButtonTitle('Отправляю...')
    // console.log('code')
    const isMailExist = await API.user_mailExist(email)
    console.log(isMailExist)
    if (isMailExist) { // auth
      const isDone = await API.auth_sendCode(email)  
    } else { // reg
      const isDone = await API.reg_sendCode(email)
    }
    setEmailButtonTitle('Отправлено!')
  }

  const handleSign = async () => {
    setSignButtonTitle('Проверяю код...')
    // console.log('sign')
    const isMailExist = await API.user_mailExist(email)
    console.log(isMailExist)
    let json
    if (isMailExist) { // auth
      json = await API.auth(email, code)  
    } else { // reg
      json = await API.reg(email, code)
    }
    localStorage.setItem('token', json.current_token)
    setSignButtonTitle('Подтверждено!')
    router.push('/events')
  }

  return (
    <>
      <Head>
        <title>Авторизация</title>
        <meta name="description" content="Авторизация" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={inter.className} sx={{width: '100vw', height: '100vh', background: 'url("")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: '50% 50%'}}>
        <Box sx={{width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.01)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card sx={{boxShadow: 'none', borderRadius: '48px', background: '#f7f7f7'}}>
                <Box p={4}>
                    {/* display={'flex'} justifyContent={'center'} flexDirection={'column'} */}
                    <Grid container spacing={1.5}>
                        <Grid item  md={12} sm={12} xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                          <img width={100} src="logo.png" alt="Picture of the author" />
                        </Grid>
                        <Grid item  md={12} sm={12} xs={12}>
                            <Typography variant="h5" color="initial" align='center'>Вход</Typography>
                        </Grid>
                        <Grid item  md={6} sm={6} xs={12}>
                            <TextField
                                inputProps={{style: {color: 'black'}}}
                                fullWidth
                                id="tf-email"
                                label="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                            />
                        </Grid>
                        <Grid item  md={6} sm={6} xs={12}>
                            <Button onClick={handleSendCode} sx={{height: '56px', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">{emailButtonTitle}</Button>
                        </Grid>
                        <Grid item  md={6} sm={6} xs={12}>
                            <TextField
                                inputProps={{style: {color: 'black' }}}
                                fullWidth
                                id="tf-code"
                                label="Код"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2) }, '& input': { paddingLeft: (theme) => theme.spacing(3.5) }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px' }, }}
                            />
                        </Grid>
                        <Grid item  md={6} sm={6} xs={12}>
                            <Button onClick={handleSign} sx={{height: '56px', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#574BCC', color: '#FFFFFF', '&:hover': {background: '#FFFFFF', color: '#574BCC'}}} fullWidth variant="contained" color="primary">{signButtonTitle}</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Box>
        <a style={{textDecoration: 'none'}} href="/app.apk"><Button sx={{display: 'fixed', bottom: '150px', left: 'calc(50% - 150px)', height: '56px', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#009F04', width: '300px', color: 'white', '&:hover': {background: 'white', color: '#009F04'}}} variant="contained" color="primary">Скачать Android-приложение</Button></a>
      </Box>
      {/* <main className={`${styles.main} ${inter.className}`}>
        test
      </main> */}
    </>
  )
}
