import Image from 'next/image'
import React from 'react'

export default function offline() {

  return (
    <div
    className='max-w-screen-lg mx-auto pb-[68px] h-screen flex flex-col justify-center'
    >
      <Image 
      src="/not-found.svg"
      alt='No connection'
      width={300}
      height={242}
      className='mx-auto'
      />
      <h1
      className='text-center class text-muted-foreground'
      >
        page not found
      </h1>
    </div>
  )
}
