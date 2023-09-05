"use client"
import { DarkModeButton } from '@/src/components/DarkModeButton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/src/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/src/components/ui/card';
import { cn } from '@/src/utils';
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function LoginPage() {
  const {data} = useSession()
  
  console.log(data);
  
  return (
    <div
    className='p-3'
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
      className='flex gap-2'
      >
        <Button
        onClick={() => signOut()}
        variant={"default"}
        >
          Sign out
        </Button>
        <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                  variant={"destructive"}
                  >
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                    className={cn(buttonVariants({
                      variant: "destructive"
                    }))}
                    onClick={() => {}}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
      </div>
    </div>
  )
}
