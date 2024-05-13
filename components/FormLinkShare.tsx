'use client'
import React from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImShare } from 'react-icons/im';
import { toast } from './ui/use-toast';

const FormLinkShare = ({shareURL}:{shareURL:string}) => {
 if(typeof window !== 'undefined'){
   const shareLink = `${window.location.origin}/submit/${shareURL}`;
    return (
     <div className="flex flex-grow items-center gap-4">
        <Input value={shareLink} readOnly/>
        <Button className='w-[250px]'
        onClick={()=>{
            navigator.clipboard.writeText(shareLink);//clipboard api
            toast({
                title: "Copied!",
                description: "Link copied to clipboard",
            });
        }}
        >
            <ImShare className='mr-2 h-4 w-4'/>
            Share Link
        </Button>
     </div>
   )
 }
}

export default FormLinkShare