'use client'
import React from 'react'
import { Button } from './ui/button';

const VisitBtn = ({shareURL}:{shareURL:string}) => {
 if(typeof window !== 'undefined'){
   const shareLink = `${window.location.origin}/submit/${shareURL}`;
    return (
    <Button
    className='w-[200px]'
    onClick={()=>{
        window.open(shareLink,'_blank');
    }}
    >  Visit </Button>
   )
 }
}

export default VisitBtn