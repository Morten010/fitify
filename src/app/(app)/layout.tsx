import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import BottomNav from '@/src/components/BottomNav';

export default async function AuthLayout({children}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions)
    
    if(!session){
        redirect("/login")
    }
  return (
    <main>
      <Navbar />
      <div
      className='max-w-screen-lg mx-auto pb-[68px]'
      >
        {children}
      </div>
      <BottomNav />
    </main>
  )
}
