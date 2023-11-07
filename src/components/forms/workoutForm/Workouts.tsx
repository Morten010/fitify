import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import {AiOutlinePlus} from "react-icons/ai"
import { DayProps, FormProps, WorkoutProps } from './WorkoutForm'
import { Textarea } from '../../ui/textarea'
import VideoType from '../../VideoType'
import { toast } from '../../ui/use-toast'
import { TiktokHow } from '../../TiktokHow'
import formatYtLink from '@/src/utils/formatYtLink'

type WorkoutsProps = {
    workoutState: {
        title: string;
        description: string;
        public: boolean;
        days: DayProps[];
    },
    workoutDispatch: React.Dispatch<FormProps>,
    workoutDay: DayProps;
}

export default function Workouts({workoutDispatch, workoutState, workoutDay}: WorkoutsProps) {

    // update exercise
    const updatedExercise = (
        day: WorkoutProps, 
        change: {
            id?: number
            exercise?: string
            description?: string
            reps?: string
            sets?: string
            video?: string
        }
    ) => {
        
        const sortedDays = workoutState.days.map(d => {
            if(!d.exercises.includes(day)) return d
            const newExercises = d.exercises.map(ex => {
                if(ex.id !== day.id ) return ex
                    
                return {
                    ...ex,
                    ...change
                }
            });
            return {
                dayName: d.dayName,
                exercises: newExercises,
                id: d.id
            }
        })

        console.log(sortedDays);
        
        workoutDispatch({
            ...workoutState,
            days: sortedDays
        })
    }

    const addExercise = (id: number) => {
        const sortedDays = workoutState.days.map(d => {
            if(d.id !== id) return d
            return {
                id: d.id,
                dayName: d.dayName,
                exercises: [...d.exercises, {
                    id: Date.now(),
                    exercise: "",
                    description: "",
                    reps: "3",
                    sets: "12",
                    video: ""
                }]
            }
        })

        workoutDispatch({
            ...workoutState,
            days: sortedDays
        })

    }

    const deleteExercise = (WorkoutId: number) => {
        const sortedDays = workoutState.days.map(d => {
            if(d.id !== workoutDay.id) return d
            return {
                ...d,
                exercises: d.exercises.filter(e => {
                    if(e.id !== WorkoutId) return e
                })
            }
            
        })

        workoutDispatch({
            ...workoutState,
            days: sortedDays,
        })
    }

    const handleVideo = (day: WorkoutProps, e: React.ChangeEvent<HTMLInputElement>) => {
        //checks if url is proper format
        const url = e.currentTarget.value
        if(url.includes("youtu")){
            const newUrl = formatYtLink(url)
            //set change
            const sortedDays = workoutState.days.map(d => {
                if(!d.exercises.includes(day)) return d
                const newExercises = d.exercises.map(ex => {
                    if(ex.id !== day.id ) return ex
                        
                    return {
                        id: ex.id,
                        exercise: ex.exercise,
                        reps: ex.reps,
                        sets: ex.sets,
                        description: ex.description,
                        video: newUrl
                    }
                });
                return {
                    dayName: d.dayName,
                    exercises: newExercises,
                    id: d.id,
                }
            })
            workoutDispatch({
                ...workoutState,
                days: sortedDays
            })
            
            return null
        }else if(url.includes("tiktok")){
            if(!url.includes("www")){
                toast({
                    title: "Wrong link format",
                    variant: "destructive"
                })
                return null
                // example link https://vm.tiktok.com/ZGJ7EjhUp/ 
                // cannot embed shorthand link
            }
        }else if(!url){
            
        }else{
            toast({
                    title: "Wrong link format",
                    variant: "destructive"
            })
            return null
        }

        //set change
        console.log(e.currentTarget.value);
        const sortedDays = workoutState.days.map(d => {
            if(!d.exercises.includes(day)) return d
            const newExercises = d.exercises.map(ex => {
                if(ex.id !== day.id ) return ex
                    
                return {
                    id: ex.id,
                    exercise: ex.exercise,
                    reps: ex.reps,
                    sets: ex.sets,
                    description: ex.description,
                    video: e.currentTarget.value
                }
            });
            return {
                dayName: d.dayName,
                exercises: newExercises,
                id: d.id,
            }
        })
        workoutDispatch({
            ...workoutState,
            days: sortedDays
        })

    }

  return (
    <div
    className='py-2'
    >
        <h2
        className='text-xl font-semibold mb-2'
        >
            Workouts
        </h2>
        <Card>
            <CardHeader className='flex justify-between flex-row items-center'>
                <CardTitle>
                    {workoutDay.dayName}
                </CardTitle>
            </CardHeader>
            <CardContent>
               {workoutDay.exercises.map((workout, index) => (
                <div
                key={workout.id}
                className={`flex flex-col gap-2 py-2 ${index !== workoutDay.exercises.length - 1 ? "border-b": ""}`}
                >
                    <h3>
                        Exercise {index + 1}
                    </h3>
                    <Input 
                    placeholder='exercise name'
                    value={workout.exercise}
                    onChange={(e) => updatedExercise(workout, { exercise: e.currentTarget.value })}
                    className='text-base'
                    />
                    <Textarea 
                    placeholder='description'
                    value={workout.description} 
                    rows={2}
                    className='resize-none text-base'
                    onChange={(e) => updatedExercise(workout, { description: e.currentTarget.value })}
                    />
                    <div
                    className='flex gap-2'
                    >
                        <Input 
                        placeholder='reps'
                        type='number'
                        value={workout.reps}
                        onChange={(e) => updatedExercise(workout, { reps: e.currentTarget.value })}
                        className='text-base'
                        />
                        <Input 
                        type='text'
                        placeholder='sets'
                        value={workout.sets}
                        onChange={(e) => updatedExercise(workout, { sets: e.currentTarget.value })}
                        className='text-base'
                        />
                    </div>
                    <div
                    className='flex gap-2'
                    >
                        <Input 
                        placeholder='Video example link'
                        value={workout.video}
                        onChange={(e) =>  handleVideo(workout, e)}
                        className='text-base'
                        />
                        <TiktokHow />
                    </div>
                    {workout.video && (
                        <VideoType video={workout.video} />
                    )}

                    <Button
                    type="button"
                    onClick={() => deleteExercise(workout.id)}
                    variant="secondary"
                    >
                        Delete workout
                    </Button>
                 </div>
               ))}
               <div
               className='flex justify-end'
               >
                    <Button
                    type='button'
                    variant={'outline'}
                    size={'icon'}
                    onClick={() => addExercise(workoutDay.id)}
                    >
                        <AiOutlinePlus 
                        className="text-xl"
                        />
                    </Button>
               </div>
            </CardContent>
        </Card>
    </div>
  )
}
