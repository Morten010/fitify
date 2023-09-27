"use client" 

import { useQuery } from 'react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Workouts } from '@/src/db/schema'
import WorkoutCard from '@/src/components/WorkoutCard'
import {ImFilesEmpty} from "react-icons/im"
import WorkoutCardSkeleton from '@/src/components/skeletons/WorkoutCardSkeleton'
import Image from 'next/image'
import Link from 'next/link'
import PublicBanner from '@/src/components/public/PublicBanner'

export default function Home() {
  const user = useSession()
  
  const {data: workouts, isFetching, refetch, isFetched, isSuccess} = useQuery({
    queryFn: async () => {
      if(!user.data) return []
      const {data} = await axios.get(`/api/workouts/find?id=${user.data?.user.id}`)
      return data
    },
    queryKey: ['Home'],
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
        {!isSuccess && (
          <>
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
          </>
        )}
        {isSuccess && Array.isArray(workouts) && workouts.map((w: Workouts) => (
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

      </section>
    </main>
  )
}
