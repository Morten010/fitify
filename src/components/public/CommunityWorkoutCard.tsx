import { CommunityWorkoutProps } from '@/src/app/(app)/community/page'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

export default function CommunityWorkoutCard({w}: {
    w: CommunityWorkoutProps
}) {
  return (
    <Link
    href={`/community/${w.id}`}
    >
        <Card>
            <CardHeader>
                <CardTitle>
                    {w.name}
                </CardTitle>
                <CardDescription>
                    by: {w.user?.name}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {w.description}
                <br />
                <span
                className='font-semibold text-lg mt-4 mb-2'
                >
                    Days:
                </span>
                <ul
                className='list-disc list-inside'
                >
                    {w.days.map(d => (
                        <li>
                            {d.dayName}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    </Link>
  )
}
