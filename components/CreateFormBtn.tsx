'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "./ui/dialog"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "./ui/form"
  import {BsFileEarmarkPlus} from "react-icons/bs"
  import {ImSpinner2} from "react-icons/im"
  import {zodResolver} from "@hookform/resolvers/zod"
  import * as z from 'zod'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
const formSchema = z.object({
    name :z.string().min(4),
    describtion :z.string().optional(),
})
type formSchemaType  = z.infer<typeof formSchema>;
const CreateFormBtn = () => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  })
  function onSubmit(values:formSchemaType){
     try{

     }
     catch(err){
      toast(
        {
          title:"Error",
          description:"Something wwent wrong , please try again later",
          variant:"destructive"
        }
      )
     }
  }
  return (
     <Dialog>
        <DialogTrigger asChild>
           <Button>Create New Form</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
                <DialogTitle>
                  Create Form
                </DialogTitle>
                <DialogDescription>
                  Create a form to start a collecting responses
                </DialogDescription>
            </DialogHeader>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                   <FormField 
                    control={form.control}
                    name = "name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                   /> 
                   <FormField 
                    control={form.control}
                    name = "describtion"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Describtion</FormLabel>
                            <FormControl>
                              <Textarea rows={5} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                   /> 
                </form>
             </Form>
             <DialogFooter>
               <Button 
                onClick={()=>form.handleSubmit(onSubmit)}
                disabled={form.formState.isSubmitting}
                className='w-full mt-4'>
                 {form.formState.isSubmitting?<ImSpinner2 className='animate-spin'/>:<span>save</span>}
              </Button>
             </DialogFooter>
         </DialogContent>
     </Dialog>
  )
}

export default CreateFormBtn