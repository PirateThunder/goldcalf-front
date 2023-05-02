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
import { LocationOnSharp } from '@mui/icons-material';
import Footer from '@/components/ui/Footer';

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

export default function CreateBid() {
    const [mode, setMode] = useState("theme1");

    const [title, setTitle]: any = useState("");
    const [description, setDescription]: any = useState("");
    const [eventstart, setEventstart]: any = useState("");
    const [eventend, setEventend]: any = useState("");
    const [bids, setBids] = useState<any[]>([])
    // const [bids, setBids] = useState<any[]>([{title: "test", description: "test"}, {title: "test", description: "test"}, {title: "test", description: "test"}, {title: "test", description: "test"}])

    const [saveText, setSaveText]: any = useState("Подать заявку");

    // React.useEffect(() => {
    //     (async () => {
    //       const token = localStorage.getItem('token')  
    //       console.log(token)
    //       if (token) {
    //         const me = await API.me(token);
    //         const id = me.int_id
    //         console.log(id)
    //         setBids ( await API.me_myRequests(token) )
    //         console.log(bids)
    //       }
    //     })();
    //     return () => {
    //       // this now gets called when the component unmounts
    //     };
    // }, []);
    

    const theme = createTheme(themeDict[mode]) 
    
    React.useEffect(() => {
        (async () => {
          const token = localStorage.getItem('token')  
          console.log(token)
          if (token) {
            const json = await API.me_myRequests(token);
            console.log(json)
            setBids ( json )

            // setFio(me.fullname || "");
            // setBirth(me.birth_dt || "");
            // setTgusername(me.tg_username || "");
          }
        })();
        return () => {
          // this now gets called when the component unmounts
        };
    }, []);

    const handleSave = () => {
        setSaveText('Делаем...')
        /*
            {
            "title": "string",
            "description": "string",
            "start_dt": "2023-04-27T16:59:39.219Z",
            "end_dt": "2023-04-27T16:59:39.219Z",
            "timeline": [
                {
                "dt": "2023-04-27T16:59:39.219Z",
                "text": "string"
                }
            ]
            }
        */
        const jsonSend = {
            title: title,
            description: description,
            start_dt: eventstart,
            end_dt: eventend,
            timeline: []
        }
        const jsonRes = API.event_requestsToCreateEvent(localStorage.getItem('token'), jsonSend)
        console.log(jsonRes)
        setSaveText('Сделано!')
        setTitle("")
        setDescription("")
        setEventstart("")
        setEventend("")
        location.reload()
    }

    return (
        <ThemeProvider theme={theme}> {/* darkTheme */}
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar />
            <Card>
                <Box p={5}>
                    <Typography variant="h4" component="h4" align='center' marginBottom={3}>
                        Подача заявки
                    </Typography>
                    <TextField
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
                    <Button onClick={handleSave} sx={{height: '56px', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#574BCC', color: '#FFFFFF', '&:hover': {background: '#FFFFFF', color: '#574BCC'}}} fullWidth variant="contained" color="primary">{saveText}</Button>
                </Box>
            </Card>
            <Box p={5}>
                <Typography variant="h4" component="h4" align='center' marginBottom={3}>
                    Заявки
                </Typography>
                <Box sx={gridContainer}>
                    {bids.map(ev => <Box sx={gridItem}>
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
                        </Card>
                    </Box>)}
                </Box>
            </Box>
            
            <Footer />
            {/* <Rightbar />
            </Stack>
            <Add /> */}
        </Box>
        </ThemeProvider>
    )
}