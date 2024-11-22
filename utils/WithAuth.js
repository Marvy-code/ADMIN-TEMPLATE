"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const withAuth = (WrappedComponent) =>{
    const Wrapper = (props) =>{
        const [loading, setLoading] = useState(true)

        const router = useRouter()

        useEffect(()=>{
            const token = localStorage.getItem('token')
            if(!token){
                router.push('/')
            }
            else{
                setLoading(false)
            }
        }, [router])

        if(loading){
            return <p className="font-bold flex items-center justify-center">Vérification de votre authentification ...</p>
        }
        return <WrappedComponent {...props} />;
    }
    return Wrapper;
}
export default withAuth;