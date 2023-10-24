import Image from 'next/image'
import React from 'react'

export default function offline() {

  return (
    <div
    className='max-w-screen-lg mx-auto pb-[68px] h-screen flex flex-col justify-center'
    >
      <Image 
      src="/no-connection.svg"
      alt='No connection'
      width={300}
      height={242}
      className='mx-auto'
      />
      <h1
      className='text-center class text-muted-foreground mt-3 text-xl mb-1 max-w-[75%] mx-auto'
      >
        Oops! It seems like you're not connected to the internet. Please check your network settings and try again.
      </h1>
    </div>
  )
}
