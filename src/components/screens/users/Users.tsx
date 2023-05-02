import React from 'react'
import Sidebar from "@/components/ui/Sidebar";
import Feed from "@/components/ui/Feed";
import Rightbar from "@/components/ui/Rightbar";
import { Select, MenuItem, Box, createTheme, Stack, ThemeProvider, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material";
import Navbar from "@/components/ui/Navbar";
import Add from "@/components/ui/Add";
import { useState } from "react";
import Card from  "@mui/material/Card"
import Grid from '@mui/material/Grid';
import * as API from "@/helpers/api"
import * as DATE from "@/helpers/date"
import { test } from 'node:test';
import Footer from "@/components/ui/Footer";
import Link from 'next/link';

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

export default function Users() {
    const [mode, setMode] = useState("theme1");
    let [isAdmin, setIsAdmin] = useState(false)

    const [title, setTitle]: any = useState("");
    const [description, setDescription]: any = useState("");
    const [eventstart, setEventstart]: any = useState("");
    const [eventend, setEventend]: any = useState("");
    const [users, setUsers] = useState<any[]>([])
    const [curUserId, setCurUserId]: any = useState(null)
    //const [users, setUsers] = useState<any[]>([{title: "test", description: "test"}])

    

    const [saveText, setSaveText]: any = useState("Подать заявку");
    //const [token, setToken]: any = useState("")
    // const [token, setToken]: any = useState("test");

    // const [age, setAge] = React.useState('');

    React.useEffect(() => {
        (async () => {
        //   setToken (localStorage.getItem('token') ) 
          let token = localStorage.getItem('token')
          console.log(token)
          if (token) {
            const me = await API.me(token);
            if (me.roles.includes("admin")) {
                setIsAdmin(true)
            }
            // const me = await API.me(token);
            // const id = me.int_id
            // console.log(id)
            setUsers( await API.user_all(token) )
            console.log(users)
          }
        })();
        return () => {
          // this now gets called when the component unmounts
        };
    }, []);
    

    const theme = createTheme(themeDict[mode]) 

    const handleBid: any = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handbiid')
        // setCurUserId(e.target.dataset.id)
        // console.log(curUserId)
        console.log(e.target.dataset.id)
        let token = localStorage.getItem('token')


        //const json = API.event_acceptRequestToCreate(token, e.target.dataset.id)
        //console.log(json)

        // const me = await API.me(token);
        //     const id = me.int_id
        //     console.log(id)
            //setUsers( await API.event_getAllRequestsToCreateEvent(token) )
    }

    const handleChange = async (event: any) => {
        //setAge(event.target.value as string);
        //console.log(event.target)
        const json = API.user_editrole(localStorage.getItem('token'), event.target.name, event.target.value)
        console.log("kk")
        console.log(json)
        // const me = await API.me(localStorage.getItem('token'));
        // if (me.roles.includes("admin")) {
        //     setIsAdmin(true)
        // }

        location.reload()
        // setUsers( await API.user_all(localStorage.getItem('token')) )
        // console.log(users)
    };

    return (
        <ThemeProvider theme={theme}> {/* darkTheme */}
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar />
            <Card>
                <Box p={5}>
                    <Typography variant="h4" component="h4" align='center' marginBottom={3}>
                        Пользователи
                    </Typography>
                        {users.map(ev => //<Box key={ev.int_id} sx={gridItem}>
                            <Card
                                raised
                                sx={{
                                    marginTop: '5px',
                                    maxWidth: '90%',
                                    margin: "0 auto",
                                    padding: "2em",
                                    height: '100%'
                                }}
                            > 
                                <Typography variant='h5'>{ev.fullname} ({ev.roles[0] === "sportsman" ? "Спортсмен" : ev.roles[0] === "admin" ? "Администратор" : ev.roles[0] === "representative"  ? "Представитель" : ev.roles[0] === "partner" ? "Партнёр" : ""})</Typography>
                                <Typography>Email: <Link href={`mailto:${ev.mail}`}>{ev.mail}</Link></Typography>
                                <Typography>Telegram: <Link href={`t.me/${ev.tg_username}`}>@{ev.tg_username}</Link></Typography>
                                <br />
                                { isAdmin ?
                                // <Button data-id={ev.int_id} onClick={e => handleBid(e)} sx={{margin: '2px', height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#574BCC', color: '#FFFFFF', '&:hover': {background: '#FFFFFF', color: '#574BCC'}}} fullWidth variant="contained" color="primary">Редактировать</Button> : <></>
                                    <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                                    <Select name={ev.int_id} data-id={ev.int_id}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={ev.roles[0]}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"sportsman"}>Спортсмен</MenuItem>
                                        <MenuItem value={"admin"}>Администратор</MenuItem>
                                        <MenuItem value={"representative"}>Представитель</MenuItem>
                                        <MenuItem value={"partner"}>Партнёр</MenuItem>
                                    </Select>
                                    <div></div>
                                    </FormControl> : <></>
                                }
                            </Card>
                        )}
                </Box>
            </Card>
            

            {/* <Rightbar />
            </Stack>
            <Add /> */}
            <Footer />
            {/* <Add /> */}
        </Box>
        </ThemeProvider>
    )
}