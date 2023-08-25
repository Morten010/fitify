import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import {AiFillDelete, AiOutlinePlus} from "react-icons/ai"
import { DayProps, FormProps, WorkoutProps } from './WorkoutForm'
import { Description } from '@radix-ui/react-toast'
import { Textarea } from '../../ui/textarea'

type WorkoutsProps = {
    workoutState: {
        title: string;
        description: string;
        days: DayProps[];
    },
    workoutDispatch: React.Dispatch<FormProps>,
    workoutDay: DayProps;
}

export default function Workouts({workoutDispatch, workoutState, workoutDay}: WorkoutsProps) {

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
                    sets: "12"
                }]
            }
        })

        workoutDispatch({
            ...workoutState,
            days: sortedDays
        })

    }

    const handleNameChange = (day: WorkoutProps, e: React.ChangeEvent<HTMLInputElement>) => {
        
        const sortedDays = workoutState.days.map(d => {
            if(!d.exercises.includes(day)) return d
            const newExercises = d.exercises.map(ex => {
                if(ex.id !== day.id ) return ex
                    
                return {
                    id: ex.id,
                    exercise: e.currentTarget.value,
                     description: ex.description,
                    reps: ex.reps,
                    sets: ex.sets,
                }
            });
            return {
                dayName: d.dayName,
                exercises: newExercises,
                id: d.id
            }
        })
        
        workoutDispatch({
            ...workoutState,
            days: sortedDays
        })
        
    }

        const handleDescChange = (day: WorkoutProps, e: React.ChangeEvent<HTMLTextAreaElement>) => {
        
        const sortedDays = workoutState.days.map(d => {
            if(!d.exercises.includes(day)) return d
            const newExercises = d.exercises.map(ex => {
                if(ex.id !== day.id ) return ex
                    
                return {
                    id: ex.id,
                    exercise: ex.exercise,
                    description: e.currentTarget.value,
                    reps: ex.reps,
                    sets: ex.sets,
                }
            });
            return {
                dayName: d.dayName,
                exercises: newExercises,
                id: d.id
            }
        })
        
        workoutDispatch({
            ...workoutState,
            days: sortedDays
        })
        
    }

    const handleRepsChange = (day: WorkoutProps, e: React.ChangeEvent<HTMLInputElement>) => {
        const sortedDays = workoutState.days.map(d => {
            if(!d.exercises.includes(day)) return d
            const newExercises = d.exercises.map(ex => {
                if(ex.id !== day.id ) return ex
                    
                return {
                    id: ex.id,
                    exercise: ex.exercise,
                    reps: e.currentTarget.value,
                    description: ex.description,
                    sets: ex.sets,
                }
            });
            return {
                dayName: d.dayName,
                exercises: newExercises,
                id: d.id
            }
        })
        workoutDispatch({
            ...workoutState,
            days: sortedDays
        })
    }

    const handleSetsChange = (day: WorkoutProps, e: React.ChangeEvent<HTMLInputElement>) => {
        const sortedDays = workoutState.days.map(d => {
            if(!d.exercises.includes(day)) return d
            const newExercises = d.exercises.map(ex => {
                if(ex.id !== day.id ) return ex
                    
                return {
                    id: ex.id,
                    exercise: ex.exercise,
                    reps: ex.reps,
                    sets: e.currentTarget.value,
                    description: ex.description
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

                <Button
                variant={'outline'}
                size={'icon'}
                onClick={() => addExercise(workoutDay.id)}
                >
                    <AiOutlinePlus 
                    className="text-xl"
                    />
                </Button>
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
                    onChange={(e) => handleNameChange(workout, e)}
                    />
                    <Textarea 
                    placeholder='description'
                    value={workout.description} 
                    rows={2}
                    className='resize-none'
                    onChange={(e) => handleDescChange(workout , e)}
                    />
                    <div
                    className='flex gap-2'
                    >
                        <Input 
                        placeholder='reps'
                        type='number'
                        value={workout.reps}
                        onChange={(e) => handleRepsChange(workout, e)}
                        />
                        <Input 
                        type='number'
                        placeholder='sets'
                        value={workout.sets}
                        onChange={(e) => handleSetsChange(workout, e)}
                        />
                    </div>
                 </div>
               ))}
            </CardContent>
        </Card>
    </div>
  )
}
