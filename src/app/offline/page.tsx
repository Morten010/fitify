import { Button } from '@/src/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function offline() {

  const handleRefresh = () => {
    
  }

  return (
    <div
    className='max-w-screen-lg mx-auto pb-[68px] h-screen flex flex-col justify-center'
    >
      <Image 
      src="/no-Connection-illustartion.svg"
      alt='No connection'
      width={300}
      height={242}
      className='mx-auto'
      />
      <h1
      className='text-center class text-muted-foreground'
      >
        you are offline get connection to continue
      </h1>
    </div>
  )
}
