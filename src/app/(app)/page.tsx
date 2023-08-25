"use client" 

import { useQuery } from 'react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Workouts } from '@/src/db/schema'
import WorkoutCard from '@/src/components/WorkoutCard'
import WorkoutCardSkeleton from '@/src/components/skeletons/WorkoutCardSkeleton'

export default function Home() {
  const user = useSession()
  
  const {data: workouts, isFetching, refetch, isFetched, isSuccess} = useQuery({
    queryFn: async () => {
      if(!user.data) return []
      const {data} = await axios.get(`/api/workouts/find?id=${user.data?.user.id}`)
      return data
    },
    enabled: !!user.data
  })
  
  console.log(workouts, isSuccess);
  
  
  
  return (
    <main
    className='p-3'
    >
      <h1
      className='text-3xl font-bold md:text-5xl lg:leading-[1.1] text-foreground mb-4'
      >
        Welcome back👋 <br />
        {user.data ? user.data.user.name : "..."}
      </h1>
      <section
      className='w-full flex flex-col gap-3'
      >
        {!isSuccess && (
          <>
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
            <WorkoutCardSkeleton />
          </>
        )}
        {isSuccess && workouts && workouts.map((w: Workouts) => (
          <WorkoutCard workout={w} />
        ))}

      </section>
    </main>
  )
}
