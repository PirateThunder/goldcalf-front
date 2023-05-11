import SignIn from '@/components/screens/signin/SignIn'
import React from 'react'
import Head from 'next/head'

export default function PageSignIn() {
  return (
    <>
      <Head>
            <title>Вход в систему</title>
            <meta name="description" content="Авторизация" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn />
    </>
  )
}
