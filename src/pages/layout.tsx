import Layout from '@/components/screens/layout/Layout'
import React from 'react'
import Head from 'next/head'

export default function PageLayout() {
  return (
    <>
      <Head>
        <title>Layout</title>
        <meta name="description" content="Авторизация" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </>
  )
}
