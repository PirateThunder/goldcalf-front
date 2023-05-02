import SignIn from '@/components/screens/signin/SignIn'
import React from 'react'
import Router, { useRouter } from 'next/router';

export default function PageSignIn() {
  const router = useRouter();
  React.useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token')  
      console.log(token)
      if (token) {
        router.push('/events')
      } else {
        router.push('/signin')
      }
    })();
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    // <h1>atoll TEST 2 :)</h1>
    <></>
  )
}
