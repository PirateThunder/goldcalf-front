import React from 'react'
import Sidebar from "@/components/ui/Sidebar";
import Feed from "@/components/ui/Feed";
import Rightbar from "@/components/ui/Rightbar";
import { Box, createTheme, Stack, ThemeProvider, Typography, InputLabel, Card, Rating } from "@mui/material";
import Navbar from "@/components/ui/Navbar";
import Add from "@/components/ui/Add";
import { useState } from "react";
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import * as API from "@/helpers/api"

const themeDict: any = {
    "theme1": {
        palette: {
        mode: "light",
        primary:{
            main: "#ffffff"
        }
        }
    }, 
    "theme2": {
        palette: {
        mode: "dark",
        primary:{
            main: "#0000FF"
        }
        }
    }, 
}

export default function Layout() {
    const [mode, setMode] = useState("theme1");
    const theme = createTheme(themeDict[mode])  
    const [value, setValue] = React.useState<number | null>(0);
    // const [token, _]

    //const [feedbacks, setFeedbacks] = useState<any[]>([])
    const [feedbacks, setFeedbacks] = useState<any[]>([])
    React.useEffect(() => {
        (async () => {
        //   setToken (localStorage.getItem('token') ) 
          let token = localStorage.getItem('token')
          console.log(token)
          if (token) {
            //const me = await API.me(token);
            // const me = await API.me(token);
            // const id = me.int_id
            // console.log(id)
            //setFeedbacks( await API.event_feedbacks(token) )
            const json = await API.getRequests(token)
            //console.log(feedbacks)
            setFeedbacks(json)
          }
        })();
        return () => {
          // this now gets called when the component unmounts
        };
    }, []);

    return (
        <ThemeProvider theme={theme}> {/* darkTheme */}
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar />
            <Box p={5}>
                <Typography variant={'h4'} textAlign={'center'}>Заявки</Typography>
            {feedbacks.map(ev => //<Box key={ev.int_id} sx={gridItem}>
                            <Card key={ev.int_id}
                                raised
                                sx={{
                                    marginTop: '5px',
                                    maxWidth: '90%',
                                    margin: "0 auto",
                                    padding: "2em",
                                    height: '100%'
                                }}
                            > 
                                {/* <Typography variant='h5'>id: {ev.int_id}</Typography> */}
                                <Typography variant='h5'>Email: <Link href={`mailto:${ev.mail}`}>{ev.mail}</Link></Typography>
                                <Typography variant='h5'>Запрлата: {ev.salary}</Typography>
                                <Typography variant='h5'>Процент удаленной работы: {ev.remote_radio}%</Typography>
                                <Typography variant='h5'>C какого года работает: {ev.work_year}</Typography>
                                <Typography variant='h5'>Уровень: {ev.experience_level}</Typography>
                                <Typography variant='h5'>Вид занятости: {ev.employment_type}</Typography>
                                <Typography variant='h5'>Должность: {ev.job_title}</Typography>
                                <br />
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <img onClick={e => {API.acceptRequest(localStorage.getItem('token'), ev.int_id, false); setFeedbacks(feedbacks.filter(f => f.int_id !== ev.int_id))}} style={{cursor: 'pointer'}} width="40" height="40" src="no.png" alt="no" />
                                    <img onClick={e => {API.acceptRequest(localStorage.getItem('token'), ev.int_id, true); setFeedbacks(feedbacks.filter(f => f.int_id !== ev.int_id))}} style={{cursor: 'pointer'}} width="40" height="40" src="yes.png" alt="yes" />
                                </div>
                            </Card>
                        )}
            </Box>
            <Footer />
        </Box>
        </ThemeProvider>
    )
}