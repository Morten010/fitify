"use client"
import React from 'react'
import { DarkModeButton } from './DarkModeButton'
import { Button, buttonVariants } from './ui/button'
import { AiFillHome } from 'react-icons/ai'
import {BiSolidUser} from "react-icons/bi"
import Link from 'next/link'
import { cn } from '../utils'
import { FaBackward } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

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
            <Link
            href="/profile"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon"})
            )}
            >
              <BiSolidUser />
            </Link>

            <Button
            variant={"outline"}
            size={'icon'}
            onClick={() => handleBack()}
            >
              <FaBackward />
            </Button>

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
