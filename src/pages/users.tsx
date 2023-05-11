import Users from '@/components/screens/users/Users'
import React from 'react'
import Head from 'next/head'

export default function PageUsers() {
  return (
    <>
      <Head>
            <title>Пользователи</title>
            <meta name="description" content="Авторизация" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
      </Head>
      <Users />
    </>
  )
}
