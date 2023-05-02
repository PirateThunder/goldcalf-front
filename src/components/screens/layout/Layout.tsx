import React from 'react'
import Sidebar from "@/components/ui/Sidebar";
import Feed from "@/components/ui/Feed";
import Rightbar from "@/components/ui/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "@/components/ui/Navbar";
import Add from "@/components/ui/Add";
import { useState } from "react";

const themeDict: any = {
    "theme1": {
        palette: {
        mode: "light",
        primary:{
            main: "#C632AD"
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
            <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode}/>
            <Feed />
            <Rightbar />
            </Stack>
            <Add />
        </Box>
        </ThemeProvider>
    )
}