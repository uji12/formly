import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi'
import useDesigner from './hook/useDesigner'
import { json } from 'stream/consumers'
import { UpdateFormContent } from '@/actions/form'
import { toast } from './ui/use-toast'
import { FaSpinner } from 'react-icons/fa'
const SaveFormBtn = ({id}:{id:number}) => {
  const{elements}=useDesigner();
  const[loading,startTransition]=useTransition()
  const updateFormContent =async()=>{
    try{
     const JsonElements= JSON.stringify(elements);
     await UpdateFormContent(id, JsonElements);
     toast({
       title: "Success",
       description: "Form updated successfully",
     })
    }
    catch(err){
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }
  return (
    <Button variant={'outline'} disabled={loading} 
    onClick={()=>{
      startTransition(updateFormContent)
    }}
    className='gap-2'>
        <HiSaveAs className='h-4 w-4'/>
        Save
        {loading && <FaSpinner className='animate-spin'/>}
    </Button>
  )
}

export default SaveFormBtn