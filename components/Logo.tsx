import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className='text-3xl font-bold  bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer'>
      <Link href={'/'}>
        FORMLY
      </Link>
    </div>
  )
}

export default Logo
