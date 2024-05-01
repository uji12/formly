'use client'
import React from 'react'
import DesignerSidebar from './DesignerSidebar'

const Designer = () => {
  return (
    <div className='flex w-full h-full'>
        <div className="p-4 w-full ">
            <div className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start overflow-y-auto">
                <p className='text-4xl text-muted-foreground flex flex-grow items-center font-bold'>
                    Drop here
                </p>
            </div>
        </div>
        <DesignerSidebar/>
    </div>
  )
}

export default Designer