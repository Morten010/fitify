import React from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid
} from "recharts"
import CustomToolTip from './CustomToolTip'

export default function ExerciseWeightChart({
    weights
}: {
    weights: {
        id: number
        weight: number
        exerciseId: number
        createdAt: string
    }[]
}) {
    const data: {
        date: string,
        value: number
    }[] = []
    weights.map(w => {
        data.push({
            date: w.createdAt,
            value: w.weight
        })
    })

  return (
    <ResponsiveContainer 
    width="100%" 
    height={400}
    >
        <AreaChart data={data}>
            <defs>
                <linearGradient 
                id='color' 
                x1={0} 
                y1={0} 
                y2={1}
                x2={0}
                >
                    <stop
                    offset="0%"
                    stopColor="#2451b7"
                    stopOpacity={0.4}
                    />
                    <stop
                    offset="75%"
                    stopColor="#2451b7"
                    stopOpacity={0.05}
                    />
                </linearGradient>
            </defs>

            <Area  
            dataKey="value" 
            stroke='#2451b7'
            fill='url(#color)'
            />

            <XAxis 
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={str => new Date(str).toLocaleDateString([], {
                day : 'numeric', 
                month: 'short', 
              })}
            />

            <YAxis 
            dataKey="value" 
            axisLine={false}
            tickLine={false}
            tickCount={10}
            tickFormatter={number => `${number} Kg`}
            />

            <Tooltip content={<CustomToolTip />} />

            <CartesianGrid 
            opacity={0.1} 
            vertical={false} 
            />

        </AreaChart>
    </ResponsiveContainer>
  )
}
