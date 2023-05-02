import Event from '@/components/screens/events/Event'
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from '@/components/ui/Navbar'
import * as API from "@/helpers/api"
import * as DATE from "@/helpers/date"
import { Box, Card, Typography } from '@mui/material'
import Footer from '@/components/ui/Footer'

export default function PageEvent() {
  const router = useRouter()
  //const { id } : any = router.query
  console.log(router.query)

  const [event, setEvent] = React.useState<any>({})
  // const [eventAnalitics, setEventAnalitics] = React.useState<any>({})
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      if(!router.isReady) return;
      const token = localStorage.getItem('token')
      const me = await API.me(token);
      setIsAdmin( me.roles.includes("admin") )
      let id = router.query.id
      setEvent( await API.event_getByIntId(localStorage.getItem('token'), id) );
      console.log(event)
      console.log(isAdmin)
      console.log(id)
      //setIsAdmin(true)
      // if (isAdmin) {
        // let id = router.query.id
        //console.log(id)
        // setEventAnalitics( await API.event_analytics(localStorage.getItem('token'), id) );
        // console.log(eventAnalitics)
      // }
      
      
    })();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>События</title>
        <meta name="description" content="Авторизация" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <img style={{zIndex: '100500', position: 'fixed', top: '10px', left: '10px'}} width={100} src="https://atoll.divarteam.ru/logo.png" alt="" /> 
      <Box p={5}>
        {/* {id} */}
        <Card>
          <Typography variant={'h4'} textAlign={"center"} >Название: {event.title ? event.title : "-"}</Typography>
          <Typography variant={'h6'} textAlign={"center"} >Описание: {event.description ? event.description : "-"}</Typography>
          <Typography textAlign={"center"}>Начало: {DATE.dmy(event.start_dt)}</Typography>
          <Typography textAlign={"center"}>Конец: {DATE.dmy(event.end_dt)}</Typography>
          <br />
          <Typography textAlign={"center"}>Таймлайн: </Typography>
          {event.timeline ? event.timeline.map((t: { dt: string; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => <Typography textAlign={"center"}>{DATE.dmy(t.dt)}, {DATE.hm(t.dt)} - {t.text}</Typography>) : <Typography textAlign={"center"}>-</Typography>}
          <br />
          {isAdmin ? 
          <Box>
          <Typography textAlign={"center"}>Аналитика: </Typography>
          <Typography textAlign={"center"} >Количество команд: {event.analytics?.teams_count ? event.analytics?.teams_count : "0"}</Typography>
          <Typography textAlign={"center"} >Среднее количество участников в командах: {event.analytics?.mean_teams_participants ? event.analytics?.mean_teams_participants : "0"}</Typography>
          <Typography textAlign={"center"}>Медианное количество участников в командах: {event.analytics?.median_teams_participants ? event.analytics?.median_teams_participants : "0"}</Typography>
          <Typography textAlign={"center"} >Количество участников всего: {event.analytics?.participants_count ? event.analytics?.participants_count : "0"}</Typography>
          <Typography textAlign={"center"} >Количество отзывов: {event.analytics?.feedbacks_count ? event.analytics?.feedbacks_count : "0"}</Typography>
          <Typography textAlign={"center"} >Средняя оценка: {event.analytics?.mean_rate ? event.analytics?.mean_rate : "0"}</Typography>
          <Typography textAlign={"center"} >Медианная оценка: {event.analytics?.median_rate ? event.analytics?.median_rate : "0"}</Typography>
          </Box> : <></>
          }
        </Card>
        <Footer />
      </Box>
    </> 
  )
}