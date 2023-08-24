import React from 'react'
import { DarkModeButton } from './DarkModeButton'
import { Button, buttonVariants } from './ui/button'
import { AiFillHome } from 'react-icons/ai'
import Link from 'next/link'
import { cn } from '../utils'

export default async function Navbar() {

  return (
    <nav
    className='p-3 border-b shadow-sm'
    >
        <div
        className='flex gap-2 justify-between mx-auto max-w-screen-lg'
        >
          <div
          className='flex gap-2'
          >
            <DarkModeButton />
            <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon"})
            )}
            >
              <AiFillHome />
            </Link>
          </div>
          <Link
          href="/create"
          className={cn(
            buttonVariants({ variant: "default", size: "sm"})
          )}
          >
            Create Workout
          </Link>
        </div>
    </nav>
  )
}
