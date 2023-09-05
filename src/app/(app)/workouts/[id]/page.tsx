"use client"
import WorkoutsSkeleton from '@/src/components/skeletons/WorkoutsSkeleton'
import { Button, buttonVariants } from '@/src/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { toast } from '@/src/components/ui/use-toast'
import { WorkoutDays, workoutDays } from '@/src/db/schema'
import { cn } from '@/src/utils'
import axios, { AxiosError } from 'axios'
import { getSession, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useMutation, useQuery } from 'react-query'

export default function page({params}: {
    params: {
        id: string
    }
}) {
    const router = useRouter()
    const id = params.id
    const {data} = useSession()
    console.log(data);
    
    // fetch workout
    const {data: workout, isFetched, isSuccess} = useQuery({
        queryFn: async () => {
          const {data} = await axios.get(`/api/workouts/findone?id=${id}`)
          return data 
        },
    })
    // delete workotu
    const {mutateAsync: deleteWorkout} = useMutation({
        mutationFn: async () => {
          const {data} = await axios.delete(`/api/workouts/delete?id=${workout.id}`,);
          return data
        },
        onError: (err: AxiosError) => {
          console.log(err);
          toast({
            title: "Could not create user",
            description: `Could not delete workout ${err.response?.data} at this time try again or come back later😢`,
            variant: "destructive"
          })
        },
        onSuccess: () => {
          toast({
            title: "Sucessfully deleted",
            description: "Redirecting you now🥳"
          })
          setTimeout(() => {
            router.push("/")
          }, 3000);
        },
      });

      const handleDelete = () => {
        deleteWorkout()
      }

    
    
  return (
    <div
    className='p-3 relative'
    >
        <div
        className='flex justify-between items-center'
        >
          <h1 
          className='text-3xl font-bold md:text-5xl lg:leading-[1.1] text-foreground mb-4'
          >
              {isSuccess && workout.name}
          </h1>
          {data && workout && data.user.id === workout.userId && (
            <div
            className='flex gap-2'
            >
              <Link
              href={`/edit/${id}`}
              className={cn(
                buttonVariants({ 
                  variant: "outline", 
                  size: "icon"
                })
              )}>
                  <AiFillEdit />
              </Link>
              <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => handleDelete()}
              >
                  <AiFillDelete />
              </Button>
              
            </div>
          )}
        </div>

        <p>
            {isSuccess && workout.description}
        </p>
        <div
        className='flex flex-col gap-2 my-4'
        >
            {isSuccess && Array.isArray(workout.days)  && workout.days.map((d: WorkoutDays) => (
                <Link
                href={`/workouts/${workout.id}/${d.id}`}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle
                            className='text-center'
                            >
                                {d.dayName}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
        {!isSuccess && !workout && <WorkoutsSkeleton />}
    </div>
  )
}
