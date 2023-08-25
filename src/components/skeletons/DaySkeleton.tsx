import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Card, CardHeader } from '../ui/card'

export default function DaySkeleton() {
    const arr = Array(10).fill("")
    
  return (
    <div>
        <Skeleton 
        className='h-[1.875rem] text-5xl md:h-[3rem] md:w-[180px] w-[140px]' 
        />
        {arr.map(i => (
            <Card
            className='mt-3'
            >
                <CardHeader
                className='flex-row justify-between items-center'
                >
                    <Skeleton 
                    className='h-[20px] w-[130px] items-center'
                    />
                    <Skeleton 
                    className='h-[20px] w-[130px]'
                    />
                </CardHeader>
            </Card>
        ))}
    </div>
  )
}
