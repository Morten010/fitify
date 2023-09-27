"use client"
import Spinner from '@/src/components/Spinner'
import { Icons } from '@/src/components/icons'
import PublicBanner from '@/src/components/public/PublicBanner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export type CommunityWorkoutProps = {
    id: number;
    name: string;
    description: string;
    public: boolean | null;
    userId: string;
    user: {
        id: string;
        name: string | null;
    };
    days: {
        id: number;
        workoutId: number | null;
        dayName: string;
    }[]
}

export default function page() {
    const [data, setData] = useState("")
    const {data: workouts, isFetching, refetch, isFetched, isSuccess, isError} = useQuery({
        queryFn: async () => {
          
        const {data} = await axios.get(`api/community/workouts`)
        console.log(data);
            
          return data
        },
        queryKey: ['Community'],
    })

    if(isFetching){
        return(
            <div
            className='w-full h-[80vh] grid place-content-center'
            >
                <Spinner />
            </div>
        )
    }

    if(isError){
        return (
            <div
            className='text-center h-[60vh] grid place-content-center text-foreground/70'
            >
              <h2>
                Error 
              </h2>
              <p>
                Could not get the workouts, <Link
                className='underline text-primary/60   underline-offset-4 hover:text-primary'
                href="/create"
                >
                  go home.
                </Link>
              </p>
            </div>
        )
    }

    console.log(workouts);
    

  return (
    <div
    className='p-3'
    >
        <PublicBanner title='Public workouts' />
        <div
        className='flex flex-col gap-2'
        >
            {workouts && workouts !== 0 && workouts.map((w: CommunityWorkoutProps) => (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {w.name}
                        </CardTitle>
                        <CardDescription>
                            by: {w.user?.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {w.description}
                        <br />
                        <span
                        className='font-semibold text-lg mt-4 mb-2'
                        >
                            Days:
                        </span>
                        <ul
                        className='list-disc list-inside'
                        >
                            {w.days.map(d => (
                                <li>
                                    {d.dayName}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>

  )
}
