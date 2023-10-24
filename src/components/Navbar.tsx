"use client"
import React from 'react'
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
    className='px-3 py-2 border-b shadow-sm sticky top-0 z-50 bg-background'
    >
        <div
        className='flex gap-2 justify-between mx-auto max-w-screen-lg'
        >
          <Button
          variant={"outline"}
          size={'icon'}
          onClick={() => handleBack()}
          >
            <FaBackward />
          </Button>

        </div>
    </nav>
  )
}
