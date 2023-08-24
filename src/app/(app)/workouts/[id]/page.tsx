"use client"
import { Workouts } from '@/src/db/schema'
import axios from 'axios'
import { desc } from 'drizzle-orm'
import React from 'react'
import { useQuery } from 'react-query'

export default function page({params}: {
    params: {
        id: string
    }
}) {
    const id = params.id

    const {data: workout, isLoading} = useQuery({
        queryFn: async () => {
          const {data} = await axios.get(`/api/workouts/findone?id=${id}`)
          return data
        },
    })
    console.log(workout);
      

  return (
    <div>
        <h1>
            {workout && workout.name}
        </h1>
        <p>
            {workout && workout.description}
        </p>
    </div>
  )
}
