import { useRouter } from "next/router";
import React from "react"

export default function Page404() {
    const router = useRouter();

    React.useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push('/')
        } else {
            router.push('/signin')
        }
    }, [])

    return (<></>)
}