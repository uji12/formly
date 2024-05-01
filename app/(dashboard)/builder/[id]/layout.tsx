import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex w-full mx-auto'>{children}</div>
  )
}

export default layout