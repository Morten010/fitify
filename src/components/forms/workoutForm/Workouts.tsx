import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import {AiFillDelete, AiOutlinePlus} from "react-icons/ai"
import { DayProps, FormProps, WorkoutProps } from './WorkoutForm'

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
        console.log(e.currentTarget.value);
        
        console.log(sortedDays);
        
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
               {workoutDay.exercises.map(workout => (
                <div
                key={workout.id}
                className='flex flex-col gap-2 border-b py-2'
                >
                    <Input 
                    placeholder='Exercise name'
                    value={workout.exercise}
                    onChange={(e) => handleNameChange(workout, e)}
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
