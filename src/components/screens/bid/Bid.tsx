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
import { test } from 'node:test';
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

const gridContainer = {
    display: "grid",
    justifyContent: "center",
    placeSelf: 'center',
    //align-items: 'center',
    justifyItems: 'center',
    gridTemplateColumns: {lg: "repeat(4, 1fr)", md: "repeat(3, 1fr)", sm: "repeat(2, 1fr)", xs: "repeat(1, 1fr)"}
    // [theme.breakpoints.up('md')]: {
    //     backgroundColor: 'red',
    // },
  };

  const gridItem = {
    margin: "8px",
    // border: "1px solid red"
  };

export default function Bid() {
    const [mode, setMode] = useState("theme1");

    const [title, setTitle]: any = useState("");
    const [description, setDescription]: any = useState("");
    const [eventstart, setEventstart]: any = useState("");
    const [eventend, setEventend]: any = useState("");
    const [bids, setBids] = useState<any[]>([])
    //const [bids, setBids] = useState<any[]>([{title: "test", description: "test"}])

    const [saveText, setSaveText]: any = useState("Подать заявку");
    //const [token, setToken]: any = useState("")
    // const [token, setToken]: any = useState("test");

    React.useEffect(() => {
        (async () => {
        //   setToken (localStorage.getItem('token') ) 
          let token = localStorage.getItem('token')
          console.log(token)
          if (token) {
            // const me = await API.me(token);
            // const id = me.int_id
            // console.log(id)
            // setBids( await API.event_getAllRequestsToCreateEvent(token) )
            const bids = API.getRequests(token)
            console.log(bids)
          }
        })();
        return () => {
          // this now gets called when the component unmounts
        };
    }, []);
    

    const theme = createTheme(themeDict[mode]) 

    const handleBid: any = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.dataset.id)
        let token = localStorage.getItem('token')
        const json = API.event_acceptRequestToCreate(token, e.target.dataset.id)
        console.log(json)
        location.reload()
        // const me = await API.me(token);
        //     const id = me.int_id
        //     console.log(id)
        //     setBids( await API.event_getAllRequestsToCreateEvent(token) )
    }

    return (
        <ThemeProvider theme={theme}> {/* darkTheme */}
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar />
            <Card>
                <Box p={5}>
                    <Typography variant="h4" component="h4" align='center' marginBottom={3}>
                        Заявки на мероприятия
                    </Typography>
                    <Box sx={gridContainer}>
                        {/* {bids.map(ev => <Box key={ev.int_id} sx={gridItem}>
                            <Card
                                raised
                                sx={{
                                    maxWidth: 330,
                                    margin: "0 auto",
                                    padding: "2em",
                                    height: '100%'
                                }}
                            > 
                                <Typography>{DATE.dmy(ev.start_dt)} - {DATE.dmy(ev.end_dt)}</Typography>
                                <Typography variant='h5'>{ev.title}</Typography>
                                <Typography>{ev.description}</Typography>

                                <Button data-id={ev.int_id} onClick={e => handleBid(e)} sx={{margin: '2px', height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#574BCC', color: '#FFFFFF', '&:hover': {background: '#FFFFFF', color: '#574BCC'}}} fullWidth variant="contained" color="primary">Принять заявку</Button>
                            </Card>
                        </Box>)} */}
                    </Box>
                    {/* <TextField
                        fullWidth
                        id="tf-title"
                        label="Название"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        id="tf-description"
                        label="Описание"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        id="tf-eventstart"
                        label="Начало мероприятия (ГГГГ-ММ-ДД)"
                        value={eventstart}
                        onChange={e => setEventstart(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        id="tf-eventend"
                        label="Конец мероприятия (ГГГГ-ММ-ДД)"
                        value={eventend}
                        onChange={e => setEventend(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <Button onClick={handleSave} sx={{height: '56px', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#574BCC', color: '#FFFFFF', '&:hover': {background: '#FFFFFF', color: '#574BCC'}}} fullWidth variant="contained" color="primary">{saveText}</Button> */}
                </Box>
            </Card>
            

            {/* <Rightbar />
            </Stack>
            <Add /> */}
            <Footer />
        </Box>
        </ThemeProvider>
    )
}