import Feedbacks from '@/components/screens/feedbacks/Feedbacks'
import React from 'react'
import Head from 'next/head'

export default function PageRequests() {
  return (
    <>
      <Head>
        <title>Заявки</title>
        <meta name="description" content="Авторизация" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feedbacks />
    </>
  )
}
