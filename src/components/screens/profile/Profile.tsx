import React from 'react'
import Sidebar from "@/components/ui/Sidebar";
import Feed from "@/components/ui/Feed";
import Rightbar from "@/components/ui/Rightbar";
import { Box, createTheme, Stack, ThemeProvider, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material";
import Navbar from "@/components/ui/Navbar";
import Add from "@/components/ui/Add";
import { useState } from "react";
import Card from  "@mui/material/Card"
import Grid from '@mui/material/Grid';
import * as API from "@/helpers/api"
import * as DATE from "@/helpers/date"
import Footer from '@/components/ui/Footer';

const themeDict: any = {
    "theme1": {
        palette: {
        mode: "light",
        // primary:{
        //     // main: "#FFFFFF"
        // }
        }
    }, 
    "theme2": {
        palette: {
        mode: "dark",
        // primary:{
        //     main: "#0000FF"
        // }
        }
    }, 
}

export default function Layout() {
    const [mode, setMode] = useState("theme1");

    const [fio, setFio]: any = useState("");
    const [birth, setBirth]: any = useState("");
    const [tgusername, setTgusername]: any = useState("");
    const [saveText, setSaveText]: any = useState("Сохранить");
    const [desc, setDesc]: any = useState("");
    

    const theme = createTheme(themeDict[mode]) 
    
    React.useEffect(() => {
        (async () => {
          const token = localStorage.getItem('token')  
          console.log(token)
          if (token) {
            const me = await API.me(token);
            console.log(me)
            setFio(me.fullname || "");
            setBirth(me.birth_dt || "");
            setTgusername(me.tg_username || "");
            setDesc(me.description || "");
          }
        })();
        return () => {
          // this now gets called when the component unmounts
        };
    }, []);

    const handleSave = () => {
        setSaveText('Сохраняем...')
        console.log(birth)
        // DATE.dmy_to_iso(birth)
        API.me_update(localStorage.getItem('token'), fio, 'lol', tgusername, desc)

        setSaveText('Сохранено!')
    }

    return (
        <ThemeProvider theme={theme}> {/* darkTheme */}
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar />
            {/* <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode}/> */}
            <Card>
                <Box p={5}>
                    <Typography variant="h4" component="h4" align='center' marginBottom={3}>
                        Профиль
                    </Typography>
                    <TextField
                        fullWidth
                        id="tf-fio"
                        label="ФИО"
                        value={fio}
                        onChange={e => setFio(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    {/* <TextField
                        fullWidth
                        id="tf-birth"
                        label="Дата рождения (ДД-ММ-ГГГГ)"
                        value={birth}
                        onChange={e => setBirth(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br /> */}
                    <TextField
                        fullWidth
                        id="tf-tgusername"
                        label="Telegram (без @)"
                        value={tgusername}
                        onChange={e => setTgusername(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        multiline
                        id="tf-desc"
                        label="Описание"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <Button onClick={handleSave} sx={{height: '56px', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#574BCC', color: '#FFFFFF', '&:hover': {background: '#FFFFFF', color: '#574BCC'}}} fullWidth variant="contained" color="primary">{saveText}</Button>
                </Box>
            </Card>
            <Footer />
            {/* <Rightbar />
            </Stack>
            <Add /> */}
            {/* <Add /> */}
        </Box>
        </ThemeProvider>
    )
}