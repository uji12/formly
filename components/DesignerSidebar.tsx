import FormElementSidebar from './FormElementSidebar'
import useDesigner from './hook/useDesigner'
import PropertiesFormSidebar from './PropertiesFormSidebar'


const DesignerSidebar = () => {
  const{selectedElement} =useDesigner()
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
       {
        !selectedElement && <FormElementSidebar/> 
       }
       {selectedElement && <PropertiesFormSidebar/>}
    </aside>
  )
}

export default DesignerSidebar