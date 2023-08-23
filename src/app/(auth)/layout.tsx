import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';

export default async function AuthLayout({children}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions)
    console.log(session);
    
    if(session){
        redirect("/")
    }

  return (
    <div>
        {children}
    </div>
  )
}
