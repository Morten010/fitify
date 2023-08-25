"use client"
import ExerciseCard from '@/src/components/ExerciseCard';
import DaySkeleton from '@/src/components/skeletons/DaySkeleton';
import { Card, CardHeader } from '@/src/components/ui/card';
import { Exercises } from '@/src/db/schema';
import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export const revalidate = 0

export default function Page({params}:{params: {
  day: string
  id: string
}}) {
  const {id} = params;

    const {data, isSuccess} = useQuery({
      queryFn: async () => {
        const {data} = await axios.get(`/api/workouts/workoutday?id=${id}`)
        return data
      },
      queryKey: ["day"]
    })

    console.log(data);
    
  return (
    <div
    className='p-3'
    >
      <h1 
      className='text-3xl font-bold md:text-5xl lg:leading-[1.1] text-foreground mb-4'
      >
        {isSuccess && data && data.dayName}
      </h1>
      <div className='flex flex-col gap-3'>
        {isSuccess && Array.isArray(data.exercises) && data.exercises.map((e: Exercises) => (
          <ExerciseCard key={e.id} exercise={e} />
        ))}

        {!isSuccess && <DaySkeleton />}
      </div>
    </div>
  )
}
