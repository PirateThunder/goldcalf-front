import React from 'react'
import Sidebar from "@/components/ui/Sidebar";
import Feed from "@/components/ui/Feed";
import Rightbar from "@/components/ui/Rightbar";
import { Box, createTheme, Stack, ThemeProvider, Typography } from "@mui/material";
import Navbar from "@/components/ui/Navbar";
import Add from "@/components/ui/Add";
import { useState } from "react";
import Footer from '@/components/ui/Footer';

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

    return (
        <ThemeProvider theme={theme}> {/* darkTheme */}
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <Navbar />
            {/* <Stack direction="row" spacing={2} justifyContent="space-between"> */}
                {/* <Sidebar setMode={setMode} mode={mode}/> */}
                
                    {/* <Typography variant="h4" component="h4" align='center' marginBottom={3}>Мероприятия</Typography> */}
                <Feed />
                {/* <Rightbar /> */}
            {/* </Stack> */}
            {/* <Add /> */}
            <Footer />
        </Box>
        </ThemeProvider>
    )
}