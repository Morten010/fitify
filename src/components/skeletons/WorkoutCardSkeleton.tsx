import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function WorkoutCardSkeleton() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                <Skeleton 
                className='h-[28px] w-[120px]'
                key="skeleton4"
                />
            </CardTitle>
        </CardHeader>
        <CardContent>
            {/* div places since cardDescription causes hydration error */}
            <div>
                <Skeleton 
                className='h-[14px] w-[96%] my-3 mt-0'
                key="skeleton1"
                />
                <Skeleton 
                className='h-[14px] w-[94%] my-3'
                key="skeleton2"
                />
            </div>
        </CardContent>
    </Card>
  )
}
