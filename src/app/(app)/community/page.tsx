"use client"
import Spinner from '@/src/components/Spinner'
import CommunityWorkoutCard from '@/src/components/public/CommunityWorkoutCard'
import PublicBanner from '@/src/components/public/PublicBanner'
import WorkoutCardSkeleton from '@/src/components/skeletons/WorkoutCardSkeleton'
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
          return data
        },
        cacheTime: 0,
        queryKey: ['Community'],
    })

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

  return (
    <div
    className='p-3'
    >
        <PublicBanner title='Public workouts' />
        <div
        className='flex flex-col gap-2'
        >
            {workouts && workouts !== 0 && workouts.map((w: CommunityWorkoutProps) => (
                <CommunityWorkoutCard w={w} />
            ))}
            {isFetching && (
                <>
                    <WorkoutCardSkeleton />
                    <WorkoutCardSkeleton />
                    <WorkoutCardSkeleton />
                    <WorkoutCardSkeleton />
                    <WorkoutCardSkeleton />
                    <WorkoutCardSkeleton />
                </>
            )}
        </div>
    </div>

  )
}
