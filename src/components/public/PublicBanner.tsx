import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import {BsGlobe2} from "react-icons/bs"

export default function PublicBanner({title}: {
    title: string
}) {
  return (
    <Card
    className='my-4 bg-primary text-white text-center py-10 relative overflow-hidden'
    >
        <CardHeader>
            <CardTitle
            className='bg-primary z-10 p-2'
            >
                {title}
            </CardTitle>
        </CardHeader>
        <BsGlobe2
        className="absolute text-[175px] top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%]"
        />
    </Card>
  )
}
