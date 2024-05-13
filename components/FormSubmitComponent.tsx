'use client'
import React, { useCallback, useRef, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from './FormElements'
import { Button } from './ui/button'
import { HiCursorClick } from 'react-icons/hi'
import { toast } from './ui/use-toast'
import { ImSpinner } from 'react-icons/im'
import { submitForm } from '@/actions/form'

const FormSubmitComponent = ({
    formurl,
    content
}:{
    formurl:string,
    content:FormElementInstance[]
}) => {
    const formValues = useRef<{[key:string]:string}>({});
    const formErrors =useRef<{[key:string]:boolean}>({});
    const [keyRender,setKeyRender] =useState(Math.random());
    const[submitted,setSubmitted] =useState(false);
    const[pending,startTransaction] = useTransition()
    const validateForm :() =>boolean = useCallback(()=>{
        for (const field of content) {
            const actualValue = formValues.current[field.id] || "";
            const valid = FormElements[field.type].validate(field, actualValue);
      
            if (!valid) {
              formErrors.current[field.id] = true;
            }
          }
      
          if (Object.keys(formErrors.current).length > 0) {
            return false;
          }
      
          return true;
    },[content]);
    const submitValue = (key:string, value:string) =>{
        formValues.current[key] = value;
    }
   const SubmitForm = async ()=>{
        formErrors.current ={};
        const validForm = validateForm();
        if(!validForm){
            setKeyRender(Math.random());
            toast({
                title:'Error',
                description:'check errors',
                variant:"destructive"
            })
        }
        try {
            const jsonContent = JSON.stringify(formValues.current);
            await submitForm(formurl,jsonContent);
            setSubmitted(true);
        } catch (error) {
            toast({
                title:'Error',
                description:'check errors',
                variant:"destructive"
            })
        }
        console.log('FORM VALUES',formValues.current);
    }
    if(submitted){
        return <div className='flex justify-center w-full h-full items-center p-8'>
            <div className="flex flex-col flex-grow max-w-[620px] bg-background p-8 gap-4 w-full border shadow-xl shadow-green-700 rounded "
            >
                <h1 className='text-2xl font-bold'>Form Submitted</h1>
                <p className='text-muted-foreground'>Thank you for submitting the form , you can close this page now</p>
            </div>
        </div>
    }
  return (
    <div className="flex justify-center w-full h-full p-8 items-center">
        <div 
        key={keyRender}
        className="flex flex-col flex-grow max-w-[620px] bg-background p-8 gap-4 w-full border shadow-xl shadow-green-700 rounded "
        >
           {
            content.map((ele)=>{
                const FormElement = FormElements[ele.type].formComponent;
                return <FormElement key={ele.id} elementInstance={ele}
                 submitValue={submitValue} isInvalid={formErrors.current[ele.id]}
                 defaultValues={formValues.current[ele.id]}
                />
            })
           }
           <Button className='mt-2 text-center '
            onClick={()=>{
               startTransaction(SubmitForm); 
            }}
            disabled={pending}
            >
            {!pending &&(
                <>
            <HiCursorClick className='mr-1'/>
              submit
                </>
            )}   
            {pending && <ImSpinner className='animate-spin'/>} 
            </Button>
        </div>
    </div>
  )
}

export default FormSubmitComponent