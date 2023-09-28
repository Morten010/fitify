import CommunityWorkoutCard from '@/src/components/public/CommunityWorkoutCard'
import PublicBanner from '@/src/components/public/PublicBanner'
import { db } from '@/src/db'
import { workouts } from '@/src/db/schema'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export type CommunityWorkoutProps = {
    id: number;
    name: string;
    description: string;
    public: boolean | null;
    userId: string;
    user: {
        id: string;
        name: string | null;
    };
    days: {
        id: number;
        workoutId: number | null;
        dayName: string;
    }[]
}

export default async function page() {
    const results = await db.query.workouts.findMany({
      where: eq(workouts.public, true),
      limit: 10,
      orderBy: [desc(workouts.id)],
      with: {
          user: {
              columns: {
                  id: true,
                  name: true,
              }
          },
          days: true,
      },
    })

    if(!results){
        return (
            <div
            className='text-center h-[60vh] grid place-content-center text-foreground/70'
            >
              <h2>
                Error 
              </h2>
              <p>
                Could not get the workouts, <Link
                className='underline text-primary/60   underline-offset-4 hover:text-primary'
                href="/create"
                >
                  go home.
                </Link>
              </p>
            </div>
        )
    }

  return (
    <div
    className='p-3'
    >
        <PublicBanner title='Public workouts' />
        <div
        className='flex flex-col gap-2'
        >
            {results.map((w: CommunityWorkoutProps) => (
                <CommunityWorkoutCard w={w} />
            ))}
        </div>
    </div>

  )
}
