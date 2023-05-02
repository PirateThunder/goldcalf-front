import Feedbacks from '@/components/screens/feedbacks/Feedbacks'
import React from 'react'
import Head from 'next/head'

export default function PageFeedBacks() {
  return (
    <>
      <Head>
        <title>Отзывы</title>
        <meta name="description" content="Авторизация" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feedbacks />
    </>
  )
}
