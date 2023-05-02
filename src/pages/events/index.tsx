import Events from '@/components/screens/events/Events'
import React from 'react'
import Head from 'next/head'

export default function PageEvents() {
  return (
    <>
      <Head>
        <title>События</title>
        <meta name="description" content="Авторизация" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Events />
    </>
  )
}
