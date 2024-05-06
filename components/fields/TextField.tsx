'use client'

import { MdTextFields } from "react-icons/md"
import { ElementsType,FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
const type:ElementsType = "TextField"
const extraAttributes={
    label:"Text Field",
    helperText:"helper text",
    required:false,
    placeholder:"value here..."
}
type CustomInstance =FormElementInstance&{
    extraAttributes:typeof extraAttributes
}
function PropertiesComponent({elementInstance}:{elementInstance:FormElementInstance}){
    const element = elementInstance as CustomInstance
    return <div>Form Propertiescomponent for {element.extraAttributes.label}</div>
}
export const TextFieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement:{
        icon:MdTextFields,
        label:"Text Field"
    },
    designerComponent: DesignerComponent,
    formComponent:()=><div>Form component</div>,
    propertiesComponent:PropertiesComponent
}
function DesignerComponent({
    elementInstance,
}:{
    elementInstance:FormElementInstance
}){
    const element = elementInstance as CustomInstance;
    const {label,placeholder,required,helperText}=element.extraAttributes;
    return  <div className="flex flex-col gap-4 w-full">
        <Label>
            {label}
            {required && '*'}
        </Label>
        <Input
         readOnly 
         disabled
         placeholder={placeholder}/>
         {helperText && (
            <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
         )}
    </div>;
}  