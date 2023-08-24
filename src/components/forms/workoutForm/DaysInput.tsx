import React, { useState } from 'react'
import {AiFillDelete} from "react-icons/ai"
import { DayProps, FormProps } from './WorkoutForm'

type DaysProps = {
    day: DayProps
    setState: (day: DayProps, dayName: string) => void
    deleteDay: (x: number) => void
}

export default function DaysInput({day, setState, deleteDay} : DaysProps) {
    const [focus, setFocus] = useState(false)
  return (
    <div 
    className={`flex border p-2 rounded-lg w-full max-w-[170px] min-w-[150px] justify-between items-center gap-1 ${focus ? "border-primary" : ""}`}
    >
      <input 
      value={day.dayName}
      onChange={(e) => setState(day, e.currentTarget.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      type="text" 
      className='bg-transparent w-[100px] focus:outline-none'
      />
      <div
      className='flex'
      >
        
        <AiFillDelete 
        onClick={() => deleteDay(day.id)}
        className="text-xl"
        />
      </div>
    </div>
  )
}
