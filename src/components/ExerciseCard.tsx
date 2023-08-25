"use client"
import React, { useState } from 'react'
import { Exercises, exercises } from '../db/schema'
import { Card } from './ui/card'

export default function ExerciseCard({exercise}: {exercise: Exercises}) {
    const [showMore, setShowMore] = useState(false)
  return (
    <Card
    className='p-6 hover:opacity-70 cursor-pointer select-none'
    onClick={() => setShowMore(!showMore)}
    >
        {/* card top */}
        <div className={`flex justify-between items-center ${showMore ? "pb-6 mb-6 border-border border-b" : ""}`}>
            <h2
            className='text-xl font-bold'
            >
                {exercise.name}
            </h2>
            <p>
                {exercise.reps} reps / {exercise.sets} sets
            </p>
        </div>
        {/* card bottom */}
        {showMore && <div 
        className="cardBottom">
            <h2
            className='text-lg font-bold'
            >
                Weights
            </h2>
            <p>Keep track of how much you have lifted each workout.</p>
            <ul>
                <ul>
                    <li className='text-sm opacity-60'>
                        Coming soon...
                    </li>
                </ul>
            </ul>
        </div>}
    </Card>
  )
}