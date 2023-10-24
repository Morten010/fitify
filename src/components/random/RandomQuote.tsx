import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { BiSolidQuoteLeft } from 'react-icons/bi'
import { randomQuotes } from '@/src/constants'

export const revalidate = 3600

export default function RandomQuote() {

  const randomNumber = Math.floor(Math.random() * randomQuotes.length)

  const quote = randomQuotes[randomNumber]

  return (
    <Dialog>
      <DialogTrigger
      className='aspect-video border border-border rounded-md p-3 grid place-content-center text-xl font-bold text-center'
      >
        Random Quote
      </DialogTrigger>
      <DialogContent
      className='max-w-[90%] rounded-md py-5'
      >
        <DialogHeader>
          <DialogDescription>
            <BiSolidQuoteLeft  
            className="text-3xl"
            />
            <p
            className='text-start text-lg mb-1'
            >
              {quote && quote.quote}
            </p>
            <p
            className='text-end'
            >
              - {quote && quote.by}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
