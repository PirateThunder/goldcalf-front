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
            setFeedbacks( await API.event_feedbacks(token) )
            console.log(feedbacks)
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
                <Typography variant={'h4'} textAlign={'center'}>Отзывы</Typography>
            {feedbacks.map(ev => //<Box key={ev.int_id} sx={gridItem}>
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
                                <Typography variant='h5'>{ev.user.fullname} ({ev.event.title})</Typography>
                                <Rating
                                    disabled
                                    name="simple-controlled"
                                    value={ev.rate}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                                <Typography>Отзыв: {ev.text}</Typography>
                                {/* <Typography>Email: <Link href={`mailto:${ev.mail}`}>{ev.mail}</Link></Typography> */}
                                <Typography>Email: <Link href={`t.me/${ev.user.mail}`}>{ev.user.mail}</Link></Typography>
                                <Typography>Telegram: <Link href={`t.me/${ev.tg_username}`}>@{ev.user.tg_username}</Link></Typography>
                                <br />
                            </Card>
                        )}
            </Box>
            <Footer />
        </Box>
        </ThemeProvider>
    )
}