"use client"
import DaySkeleton from '@/src/components/skeletons/DaySkeleton';
import { Button } from '@/src/components/ui/button';
import { Card, CardHeader } from '@/src/components/ui/card';
import { Exercises } from '@/src/db/schema';
import axios from 'axios';
import React from 'react'
import {FaBackward} from "react-icons/fa"
import { useQuery } from 'react-query';

export default function Page({params}:{params: {
  day: string
  id: string
}}) {
  const {id, day} = params;

    const {data, isSuccess} = useQuery({
      queryFn: async () => {
        const {data} = await axios.get(`/api/workouts/workoutday?id=${id}`)
        return data
      }
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
      <div>
        {isSuccess && data.exercises && data.exercises.map((e: Exercises) => (
          <Card>
            <CardHeader 
            className='flex-row justify-between items-center'
            >
              <h2>{e.name}</h2>
              <p>{e.reps} reps / {e.sets} sets</p>
            </CardHeader>
          </Card>
        ))}
        {!isSuccess && <DaySkeleton />}
      </div>
    </div>
  )
}
