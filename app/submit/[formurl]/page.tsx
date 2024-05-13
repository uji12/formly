import { GetFormContebtByUrl } from '@/actions/form';
import { FormElementInstance } from '@/components/FormElements';
import FormSubmitComponent from '@/components/FormSubmitComponent';
import React from 'react'



const SubmitPage = async ({params}:{params:{formurl:string}}) => {
    const form =await GetFormContebtByUrl(params.formurl);
    if(!form) throw new Error("Invalid")
    const formContent =JSON.parse(form.content) as FormElementInstance[]
    return (
    <FormSubmitComponent formurl={params.formurl} content={formContent}/>
  )
}

export default SubmitPage