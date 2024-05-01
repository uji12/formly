import React from 'react'
import { Button } from './ui/button'
import { MdOutlinePublish } from 'react-icons/md'

const PublishFormBtn = () => {
  return (
    <Button variant={'outline'} className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'>
        <MdOutlinePublish className='h-6 w-4'/>
        Publish 
    </Button>
  )
}

export default PublishFormBtn