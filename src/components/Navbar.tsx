import React from 'react'
import { DarkModeButton } from './DarkModeButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]/route'

export default async function Navbar() {
    const session = await getServerSession(authOptions)
    
    if(!session){
        return
    }
    console.log(session);
    

  return (
    <nav
    className='p-3 flex justify-between items-center'
    >
        <DarkModeButton />
        <p>
            {session.user.email}
        </p>
    </nav>
  )
}
