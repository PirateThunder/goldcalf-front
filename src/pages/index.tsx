import SignIn from '@/components/screens/signin/SignIn'
import React from 'react'
import Router, { useRouter } from 'next/router';
import * as API from "@/helpers/api"

export default function PageSignIn() {
  const router = useRouter();
  React.useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token')  
      console.log(token)
      if (token) {
        //router.push('/events')
        const me = await API.me(token);
        if (me.roles.includes('trainee')) {
          router.push('/profile')
        }
        if (me.roles.includes('hr')) {
          router.push('/requests')
        }
        if (me.roles.includes('dev')) {
          router.push('/users')
        }
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
