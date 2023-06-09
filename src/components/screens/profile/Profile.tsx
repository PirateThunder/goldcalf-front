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

    const [mail, setMail]: any = useState("");
    const [role, setRole]: any = useState("");
    const [salary, setSalary]: any = useState(0);
    const [remoteRadio, setRemoteRadio]: any = useState(0);
    const [workYear, setWorkYear]: any = useState(0);
    const [experienceLevel, setExperienceLevel]: any = useState("");
    const [employmentType, setEmploymentType]: any = useState("");
    const [jobTitle, setJobTitle]: any = useState("");

    const [requestMode, setRequestMode]: any = useState(null)
    const [requestFormTitle, setRequestFormTitle]: any = useState(null)

    const theme = createTheme(themeDict[mode]) 
    
    React.useEffect(() => {
        (async () => {
          const token = localStorage.getItem('token')  
          console.log(token)
          if (token) {
            const isRequestExists = await API.request_exists(localStorage.getItem('token'))
            if (isRequestExists) {
                setRequestMode('edit')
                setRequestFormTitle('Изменить резюме')

                const jsonMyReq = await API.request_my(localStorage.getItem('token'))
                setMail(jsonMyReq.mail || "")
                setSalary(jsonMyReq.salary || 0)
                setRemoteRadio(jsonMyReq.remote_radio || 0)
                setWorkYear(jsonMyReq.work_year || 0)
                setExperienceLevel(jsonMyReq.experience_level || "")
                setEmploymentType(jsonMyReq.employment_type || "")
                setJobTitle(jsonMyReq.job_title || "")
            } else {
                setRequestMode('create')
                setRequestFormTitle('Создать резюме')

                const me = await API.me(token)
                setMail(me.mail || "")
            }
            // const me = await API.me(token);
            // console.log(me)

            // setFio(me.fullname || "");
            // setBirth(me.birth_dt || "");
            // setTgusername(me.tg_username || "");
            // setDesc(me.description || "");

            // setMail(me.mail || "")
            // setRole(me.roles[0] || "")

            // setSalary(me.salary || 0)
            // setRemoteRadio(me.remote_radio || 0)
            // setWorkYear(me.work_year || 0)
            // setExperienceLevel(me.experience_level || "")
            // setEmploymentType(me.employment_type || "")
            // setJobTitle(me.job_title || "")
          }
        })();
        return () => {
          // this now gets called when the component unmounts
        };
    }, [requestMode]);

    const handleSave = async () => {
        setSaveText('Сохраняем...')
        
        if (requestMode == 'create') {
            await API.sendRequest(localStorage.getItem('token'), mail, salary, remoteRadio, workYear, experienceLevel, employmentType, jobTitle)
            setRequestMode('edit')
            setRequestFormTitle('Изменить резюме')
        } else if (requestMode == 'edit') {
            await API.updateRequest(localStorage.getItem('token'), mail, salary, remoteRadio, workYear, experienceLevel, employmentType, jobTitle)
        }

        setSaveText('Сохранено!')
    }

    const handleDelete = async () => {
        // setSaveText('Удаляем...')
        
        // if (requestMode == 'create') {
        //     await API.sendRequest(localStorage.getItem('token'), mail, salary, remoteRadio, workYear, experienceLevel, employmentType, jobTitle)
        //     setRequestMode('edit')
        //     setRequestFormTitle('Изменить резюме')
        // } else if (requestMode == 'edit') {
        //     await API.updateRequest(localStorage.getItem('token'), mail, salary, remoteRadio, workYear, experienceLevel, employmentType, jobTitle)
        // }
        const json = API.request_deleteMy(localStorage.getItem('token'))
        setRequestMode('create')
        setRequestFormTitle('Создать резюме')

        // setSaveText('Удалено!')
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
                        {requestFormTitle}
                    </Typography>
                    <TextField
                        fullWidth
                        id="tf-mail"
                        label="Email"
                        value={mail}
                        onChange={e => setMail(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        id="tf-salary"
                        label="Зарплата"
                        value={salary}
                        onChange={e => setSalary(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        id="tf-remoteRadio"
                        label="Процент на удалённой работе"
                        value={remoteRadio}
                        onChange={e => setRemoteRadio(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        id="tf-workYear"
                        label="Количество лет работы"
                        value={workYear}
                        onChange={e => setWorkYear(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        id="tf-experienceLevel"
                        label="Уровень"
                        value={experienceLevel}
                        onChange={e => setExperienceLevel(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        id="tf-employmentType"
                        label="Вид занятости"
                        value={employmentType}
                        onChange={e => setEmploymentType(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth
                        id="tf-jobTitle"
                        label="Профессия"
                        value={jobTitle}
                        onChange={e => setJobTitle(e.target.value)}
                        sx={{ '& label': { paddingLeft: (theme) => theme.spacing(2), }, '& input': { paddingLeft: (theme) => theme.spacing(3.5), }, '& fieldset': { paddingLeft: (theme) => theme.spacing(2.5), borderRadius: '15px', color: '#000' }, }}
                    />
                    <br /><br />
                    <Button onClick={handleSave} sx={{height: '56px', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#574BCC', color: '#FFFFFF', '&:hover': {background: '#FFFFFF', color: '#574BCC'}}} fullWidth variant="contained" color="primary">{saveText}</Button>
                    <br /><br />
                    {requestMode === 'edit' && <Button onClick={handleDelete} sx={{height: '56px', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#FFFFFF', color: '#FF0000', '&:hover': {background: '#FF0000', color: '#FFFFFF'}}} fullWidth variant="contained" color="primary">Удалить</Button>}
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