import { db } from '@/src/db'
import { exercises, weights, workoutDays, workouts } from '@/src/db/schema'
import { eq } from 'drizzle-orm'

export async function DELETE(req: Request, res: Response) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    if(!id) return new Response("Missing id", {status: 400})

    await db.transaction(async (tx) => {
        const daysIds : number[] = []
        const exercisesIds : number[] = []
        const weightsIds: number[] = []

        // get days, reltated workouts and weights
        const days = await tx.query.workoutDays.findMany({
            with: {
               exercises: {
                with: {
                    weights: true
                }
               }
            },
            where: eq(workoutDays.workoutId, parseInt(id))
        })

        // map through exercises and exercises days and push 
        // their ids to their array 
        days.map(d => {
            // push day id
            daysIds.push(d.id)
            // push exercises ids
            d.exercises.map(ex => {
                exercisesIds.push(ex.id)
                //push weights ids
                ex.weights.map(w => {
                    weightsIds.push(w.id)
                })
            })
        })

        // start of by deleting weights
        const weightsPromises = weightsIds.map(async (weightId) => {
            await tx.delete(weights).where(eq(weights.id, weightId))
        })

        await Promise.all(weightsPromises)

        // then delete exercises
       const exPromises = exercisesIds.map(async (exerciseId) => {
            await tx.delete(exercises).where(eq(exercises.id, exerciseId))
        })

        await Promise.all(exPromises)

        //then delete the workout days
        const daysPromises = daysIds.map(async (dayId) => {
            await tx.delete(workoutDays).where(eq(workoutDays.id, dayId))
        })

        await Promise.all(daysPromises)

        //delete workouts at the end
        const workout = await tx.delete(workouts).where(eq(workouts.id, parseInt(id)))
        console.log(workout);
        
    })

    return new Response("Success")
    
}
