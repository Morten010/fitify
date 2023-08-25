import React from 'react'
import { DayProps, FormProps } from './WorkoutForm';
import { Button } from '../../ui/button';
import DaysInput from './DaysInput';

type DaysProps = {
    workoutState: {
        title: string;
        description: string;
        days: DayProps[];
    },
    workoutDispatch: React.Dispatch<FormProps>
}

export default function Days({workoutState, workoutDispatch,}: DaysProps) {
    const setDays = (day: DayProps, name: string) => {
        const oldDays = workoutState.days;
        const sortedDays = oldDays.map(d => {
            if(d.id !== day.id){
                return d
            } else{
                return {
                    id: d.id,
                    dayName: name,
                    exercises: d.exercises
                }
            }
        })

        workoutDispatch({
            ...workoutState,
            days: sortedDays
        })
    }

    const addDay = () => {
        workoutDispatch({
            ...workoutState,
            days: [
                ...workoutState.days,
                {
                    id: Date.now(),
                    dayName: "Legs",
                    exercises: [{
                        id: Date.now(),
                        exercise: "",
                        description: "",
                        reps: "12",
                        sets: "3"
                    }]
                } 
            ]
        })
    }

    const deleteDay = (id: number) => {
        const filteredDays = workoutState.days.filter(day => {
            if(day.id !== id){
                return day
            }
        })
        workoutDispatch({
            ...workoutState,
            days: filteredDays
        })
    }
  return (
    <div>
        <div
        className='flex justify-between items-center py-2'
        >
            <h2
            className='text-xl font-semibold'
            >
                Days
            </h2>
            <Button
            variant={'outline'}
            onClick={addDay}
            >
                Add Day
            </Button>
        </div>
        <div
        className='flex my-2 gap-2 overflow-auto scrollbar-hide min-h-[41.6px]'
        >
        {workoutState.days.map(day => (
            <DaysInput 
            key={day.id}
            day={day} 
            setState={setDays} 
            deleteDay={deleteDay}
            />
        ))}
        </div>
    </div>
  )
}
