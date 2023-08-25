import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Card, CardHeader } from '../ui/card'

export default function WorkoutsSkeleton() {
  return (
    <div>
        <Skeleton 
        className='h-[1.875rem] text-5xl md:h-[3rem] md:w-[180px] w-[140px]' 
        />
        <Skeleton 
        className='h-[14px] mt-4 w-[80%]'
        />
        <div>
          <Card
          className='mt-3'
          >
            <CardHeader>
              <Skeleton 
              className='h-[1.8rem] w-[130px] mx-auto'
              />
            </CardHeader>
          </Card>
          <Card
          className='mt-3'
          >
            <CardHeader>
              <Skeleton 
              className='h-[1.8rem] w-[130px] mx-auto'
              />
            </CardHeader>
          </Card>
          <Card
          className='mt-3'
          >
            <CardHeader>
              <Skeleton 
              className='h-[1.8rem] w-[130px] mx-auto'
              />
            </CardHeader>
          </Card>
          <Card
          className='mt-3'
          >
            <CardHeader>
              <Skeleton 
              className='h-[1.8rem] w-[130px] mx-auto'
              />
            </CardHeader>
          </Card>
        </div>
    </div>
  )
}
