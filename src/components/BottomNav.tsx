import { Home, Plus, User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { cn } from '../utils'
import { buttonVariants } from './ui/button'

export default function BottomNav() {
  return (
    <div
    className='fixed bottom-0 left-0 w-full flex justify-center border-t bg-background pb-3'
    >
        <nav 
        className='flex justify-evenly items-center gap-7 w-full p-3 max-w-screen-lg mx-auto'
        >
            <Link
            href="/"
            >
                <Home />
            </Link>
            <Link
            href="/create"
            className={cn(
                buttonVariants({ 
                    variant: "default", 
                    size: "icon",
                    class: "rounded-full"
                })
            )}
            >
              <Plus />
            </Link>
            <Link
            href="/profile"
            >
              <User2 />
            </Link>
            
        </nav>
    </div>
  )
}
