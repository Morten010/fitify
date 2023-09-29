import { db } from '@/src/db'
import { exercises, workoutDays, workouts } from '@/src/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { eq } from 'drizzle-orm';


export async function POST(req: Request, res: Response) {
    console.log("ran");
    const {id}: { id: number } = await req.json()

    console.log(id);

    const copyWorkout = await db.query.workouts.findFirst({
        where: eq(workouts.id, id),
        with: {
            days: {
                with: {
                    exercises: true
                }
            }
        }
    })
    console.log(copyWorkout);
    

    if(!copyWorkout){
        console.log("error");
        
        return new Response("Failed to copy workout🙁", {
            status: 400,
        })
    }
    
    const user = await getServerSession(authOptions)

    console.log(user);
    
    if(!user?.user.id){
        console.log("error");

        return new Response("Could not get user🙁", {
            status: 400,
        })
    }

    const newWorkout = await db.insert(workouts).values({
        name: copyWorkout.name,
        description: copyWorkout.description,
        userId: user.user.id,
        public: false,
        isCopied: true
    })

    if(!newWorkout){
        return new Response("Failed to create workout🙁", {
            status: 400,
        })
    }

    const filteredWorkoutDays = copyWorkout.days.map(async (d) => {
        const newWorkoutDay = await db.insert(workoutDays).values({
            dayName: d.dayName,
            workoutId: parseInt(newWorkout.insertId),
        })

        if(!newWorkoutDay){
            const deleteWorkout = db.delete(workouts).where(eq(workouts.id, parseInt(newWorkout.insertId)))
            return new Response("Failed to create workout🙁", {
                status: 400,
            })
        }

        const wait = d.exercises.map(async (e) => {
            const newExercise = await db.insert(exercises).values({
                name: e.name,
                reps: e.reps,
                sets: e.sets,
                description: e.description,
                workoutDayId: parseInt(newWorkoutDay.insertId),
                video: e.video
            })
            if(!newExercise){
                const deleteWorkout = db.delete(workouts).where(eq(workouts.id, parseInt(newWorkout.insertId)))
                return new Response("Failed to create workout🙁", {
                    status: 400,
                })
            }
        })
        await Promise.all(wait)
    })

    await Promise.all(filteredWorkoutDays)
    

    return new Response("Successfully created workout")
}
