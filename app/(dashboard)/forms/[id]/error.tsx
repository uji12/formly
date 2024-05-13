'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"
import { IoArrowBackCircle } from "react-icons/io5";
function ErrorPage({error}:{error:Error}){
    useEffect(()=>{
      console.error(error)
    },[error])
    return <div className="flex w-full h-full flex-col items-center justify-center">
        <h2 className="text-destructive text-4xl">Something went wrong!</h2>
        <Button variant={'outline'} asChild className="mt-4">
            <Link href={'/'} className="text-2xl"> <span className="w-full mr-2"><IoArrowBackCircle/></span>Back To home page  </Link>
        </Button>
    </div>
}
export default ErrorPage