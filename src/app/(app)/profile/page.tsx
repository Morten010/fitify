"use client"
import { DarkModeButton } from '@/src/components/DarkModeButton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/src/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/src/components/ui/card';
import { toast } from '@/src/components/ui/use-toast';
import { cn } from '@/src/utils';
import axios, { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useMutation } from 'react-query';

export default function LoginPage() {
  const {data} = useSession()

  const {mutateAsync: deleteUser, isLoading} =useMutation({
    mutationFn: async (userId: string) => {
      
      const {data} = await axios.delete(`/api/user/delete?id=${userId}`,);
      return data
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Could not Delete account",
        description: `Could not delete your account ${err.response?.data} at this time try again or come back later😢`,
        variant: "destructive"
      })
    },
    onSuccess: () => {
      toast({
        title: "Sucessfully deleted",
        description: "Redirecting you now🥳"
      })
      setTimeout(() => {
        signOut()
      }, 1500);
    },
  });

  const handleDeleteAccount = () => {
    deleteUser(data?.user.id)
  }
  
  
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
                    disabled={isLoading}
                    className={cn(buttonVariants({
                      variant: "destructive"
                    }))}
                    onClick={() => handleDeleteAccount()}
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
