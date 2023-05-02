import { Box, Stack, Skeleton, Avatar, IconButton, Button } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";
import Grid from "@mui/material/Grid";
// import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography";
import * as API from "@/helpers/api"
import * as DATE from "@/helpers/date"
import { useRouter } from "next/router";

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

/**
 * This approach works best if you have a variable number of columns at runtime.
 * Replace `gridContainer` with `gridContainer2` at line 27 to give it a try.
 */
// const gridContainer2 = {
//   display: "grid",
//   gridAutoColumns: "1fr",
//   gridAutoFlow: "column"
// };

const gridItem = {
  margin: "8px",
  // border: "1px solid red"
};

const Feed = () => { // FeedEvents
  const [loading, setLoading] = useState(true);
  //const [events, setEvents] = useState<any[]>([{title: "test", description: "test"}])
  const [events, setEvents] = useState<any[]>([])
  const router = useRouter()

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     effectWrap()
  //   }
  //   const t = fetchData()
  //   // console.log(t)
  // }, [])

  React.useEffect(() => {
    (async () => {
      const events = await API.event_all(localStorage.getItem('token'));
      console.log(events)
      setEvents(events);
    })();
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  //let timer: number
  const timer: any = setTimeout(() => {
    setLoading(false);
  }, 3000);
//   }, [3000]);

  const handleEvent = (e: any) => {
    console.log(e.target.dataset.id)
    router.push(`/events/${e.target.dataset.id}`)
  }

  return (
    //<Box flex={4} p={{ xs: 0, md: 2 }}>
    
    <Box p={1}>
      <Typography textAlign={'center'} variant='h3'>Мероприятия</Typography>
      <Box display={'flex'} justifyContent={'center'} sx={gridContainer}>
          {events.map(ev => <Box sx={gridItem}>
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
                {/* <Typography>{ev.description}</Typography>  data-id={ev.int_id} onClick={e => handleEvent(e)} */}

                <a href={`/events/${ev.int_id}`}><Button sx={{margin: '2px', height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#574BCC', color: '#FFFFFF', '&:hover': {background: '#FFFFFF', color: '#574BCC'}}} fullWidth variant="contained" color="primary">Подробнее</Button></a>
                {/* <Button sx={{margin: '2px', height: '30px', width: 'auto', boxShadow: 'none', borderRadius: '15px', textTransform: 'none', background: '#F3EFFB', color: '#574BCC', '&:hover': {background: '#574BCC', color: '#F3EFFB'}}} fullWidth variant="contained" color="primary">Пользователи</Button> */}
              </Card>
          </Box>)}
      </Box>
    </Box>
  );
};

export default Feed;
