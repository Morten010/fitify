"use client" 

import { useQuery } from 'react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import WorkoutCard from '@/src/components/WorkoutCard'
import WorkoutCardSkeleton from '@/src/components/skeletons/WorkoutCardSkeleton'
import Link from 'next/link'
import PublicBanner from '@/src/components/public/PublicBanner'
import { SelectWorkouts } from '@/src/db/schema'

export default function Home() {
  // get user data
  const user = useSession()
  
  //fetch users workouts
  const {data: workouts, isLoading, isIdle, isSuccess, isError } = useQuery({
    queryFn: async () => {
      if(!user.data) return []
      const {data} = await axios.get(`/api/workouts/find?id=${user.data?.user.id}`)
      return data
    },
    queryKey: ['Home'],
    //first fetch when user data has arrived
    enabled: !!user.data
  })


  return (
    <main
    className='p-3'
    >
      <h1
      className='text-3xl font-semibold md:text-5xl lg:leading-[1.1] text-foreground mb-4'
      >
        Welcome back👋 <br />
        {user.data ? user.data.user.name : "..."}
      </h1>
      <Link
      href="/community"
      >
        <PublicBanner title='Try a community workout' />
      </Link>
      <section
      className='w-full flex flex-col gap-3'
      >
        <h2
        className='text-2xl font-semibold'
        >
          You're workouts
        </h2>
        {isLoading || isIdle && (
          <>
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
          </>
        )} 
        {isSuccess && Array.isArray(workouts) && workouts.map((w: SelectWorkouts) => (
          <WorkoutCard key={w.id} workout={w} />
        ))}

        {isSuccess && workouts.length === 0 && <div
        className='text-center h-[60vh] grid place-content-center text-foreground/70'
        >
          <h2>
            you have no workouts yet
          </h2>
          <p>
            No workouts in your list yet, <Link
            className='underline text-primary/60   underline-offset-4 hover:text-primary'
            href="/create"
            >
              create workout.
            </Link>
          </p>
        </div>}

        {isError && (
          <p>
            Could not get data
          </p>
        )}

      </section>
    </main>
  )
}
