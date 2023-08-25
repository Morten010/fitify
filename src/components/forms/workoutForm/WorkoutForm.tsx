"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import React, { useReducer} from 'react'
import { Button } from '../../ui/button'
import Days from './Days'
import Workouts from './Workouts'
import { useMutation } from 'react-query'
import { toast } from '../../ui/use-toast'
import axios, { AxiosError } from 'axios'
import { flatten, minLength, object, parse, string } from 'valibot'
import { useRouter } from 'next/navigation'
import { Icons } from '../../icons'


// props
export type WorkoutProps = {
    id: number
    exercise: string
    description: string
    reps: string
    sets: string
}

export type DayProps = {
    id: number
    dayName: string
    exercises: WorkoutProps[]
}

export type FormProps = {
    title: string,
    description: string
    days: DayProps[]
}

// validation schemas
const workoutSchema = object({
    title: string("workout name required",[
      minLength(1, "workout name required"),
    ]),
    description: string("description required",[
        minLength(1, "description required"),
    ]),
});
const daysSchema = object({
    dayName: string("day name required",[
      minLength(1, "day name required"),
    ]),
});
const exerciseSchema = object({
    exercise: string("exercise required",[
      minLength(1, "exercise required"),
    ]),
    description: string("description required", [
        minLength(1, "description required")
    ]),
    reps: string("reps required",[
        minLength(1, "reps required"),
    ]),
    sets: string("sets required",[
        minLength(1, "sets required"),
    ]),
});


export default function WorkoutForm() {
    const [workoutState, workoutDispatch] = useReducer((prev: FormProps, next: FormProps) => {
        return {...prev, ...next}
    }, {
       title: "",
       description: "",
        days: [{
            id: Date.now(),
            dayName: "legs",
            exercises: [{
                id: Date.now(),
                exercise: "",
                description: "",
                reps: "3",
                sets: "12"
            }]
        }]
    })
    const router = useRouter()

    const {mutateAsync: createWorkout, isLoading} = useMutation({
        
        mutationFn: async () => {
            console.log(workoutState);
            const {data} = await axios.post("/api/workouts/create", workoutState);
            return data
        },
        onError: (err: AxiosError) => {
            console.log(err);
            toast({
            title: "Could not create user",
            description: `Could not create user ${err.response?.data} at this time try again or come back later😢`,
            })
        },
        onSuccess: () => {
            toast({
            title: "Successfully created Workout🥳",
            description: "Redirecting you now"
            })
            setTimeout(() => {
                router.push("/")
            }, 3000);
        },
    });

    const handleSubmit = async () => {
        try{
            console.log(workoutState);
            const workoutDetails = {
                title: workoutState.title,
                description: workoutState.description
            }
            parse(workoutSchema, workoutDetails)

            workoutState.days.map(d => {
                if(!d.dayName){
                    const {exercises} = d
                    parse(daysSchema, exercises)
                }
                d.exercises.map(e => {
                    if(!e.exercise || !e.reps || !e.sets){
                        parse(exerciseSchema, e)
                    }
                })
            })

        }catch{
            toast({
                title: "Fill out everything",
                description: "Something in the form is missing. good luck hunting🔎",
                variant: "destructive"
            })
            return
        }
        
        await createWorkout()
    }
    console.log(isLoading);
    

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <Card>
            <CardHeader>
                <CardTitle>
                    Workout Details
                </CardTitle>
            </CardHeader>
            <CardContent
            className='gap-3 flex flex-col'
            >
                <Input 
                placeholder='workout name'
                value={workoutState.title}
                onChange={(e) => workoutDispatch({
                    ...workoutState,
                    title: e.currentTarget.value
                })}
                />
                <Textarea
                placeholder='description'
                className='resize-none'
                rows={5}
                value={workoutState.description}
                onChange={(e) => workoutDispatch({
                    ...workoutState,
                    description: e.currentTarget.value
                })}
                />
            </CardContent>
        </Card>
        
        <Days 
        workoutDispatch={workoutDispatch} 
        workoutState={workoutState} 
        />

        {workoutState.days.map(day => (
            <Workouts 
            workoutDispatch={workoutDispatch} 
            workoutState={workoutState} 
            workoutDay={day}
            key={day.id}
            />
        ))}

        <Button
        disabled={isLoading}
        onClick={() => !isLoading ? handleSubmit() : undefined}
        >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
        </Button>
    </form>
  )
}
