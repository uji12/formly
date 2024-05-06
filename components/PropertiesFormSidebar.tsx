//2:17:49 // remaining --> 2:10:17
import React from 'react'
import useDesigner from './hook/useDesigner'
import { FormElements } from './FormElements';
import { Button } from './ui/button';
import { AiOutlineClose } from "react-icons/ai";
const PropertiesFormSidebar = () => {
    const{selectedElement,setSelectedElement} =useDesigner()
    if(!selectedElement) return null;
    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className='flex flex-col p-2'>
        <div className="flex justify-between items-center">
            <p className="text-sm text-forground/70">Elements Properties</p>
            <Button size={"icon"}
             variant={"ghost"}
             onClick={()=>{
                setSelectedElement(null)
             }}
            >
                <AiOutlineClose/>
            </Button>
        </div>
        <PropertiesForm elementInstance={selectedElement}/>
    </div>
  )
}

export default PropertiesFormSidebar