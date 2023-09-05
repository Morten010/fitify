"use client"
import { DarkModeButton } from '@/src/components/DarkModeButton';
import { Button } from '@/src/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/src/components/ui/card';
import { useSession } from 'next-auth/react'
import React from 'react'

export default function LoginPage() {
  const {data} = useSession()
  
  console.log(data);
  
  return (
    <div
    className='p-3 min-h-screen'
    >
      {/* title and darkmode */}
      <div
      className='flex justify-between'
      >
        <h1
        className='text-3xl font-bold md:text-5xl lg:leading-[1.1] text-foreground mb-4'
        >
            Profile
        </h1>
        <DarkModeButton />
      </div>

      {/* edit details */}
      <div
      className='mb-4'
      >
        <h2
        className='text-lg font-semibold'
        >
          Full name
        </h2>
        <p
        className='text-muted-foreground'
        >
          {data?.user && data.user.name}
        </p>
        <h2
        className='text-lg font-semibold'
        >
          Email
        </h2>
        <p
        className='text-muted-foreground'
        >
          {data?.user && data.user.email}
        </p>
      </div>

      {/* signout and delete account */}
      <div
      className='flex gap-2 mt-auto'
      >
        <Button
        variant={"default"}
        >
          Sign out
        </Button>
        <Button
        variant={"destructive"}
        >
          Delete Account
        </Button>
      </div>
    </div>
  )
}
