import { db } from '@/src/db'
import { weights, workouts } from '@/src/db/schema'
import { asc, desc, eq } from 'drizzle-orm'


export const GET = async (req: Request, res: Response) => {
    // ! use later to search for workouts
    // const url = new URL(req.url)
    // const id = url.searchParams.get('id')
    // const amount = url.searchParams.get('amount')
    // console.log(amount);

    const results = await db.query.workouts.findMany({
        orderBy: [desc(weights.id)],
        limit: 20,
        with: {
            user: {
                columns: {
                    name: true,
                    id: true
                }
            },
            days: true
        },
        where: eq(workouts.public, true)
    })
    
    console.log(results);
    
    
    if(!results) return new Response("Something went wrong trying to get the data", {status: 400})

    return new Response(JSON.stringify(results))
    
}

