import { db } from '@/src/db'
import { weights, workouts } from '@/src/db/schema'
import { asc, desc, eq } from 'drizzle-orm'

export async function GET(req: Request, res: Response) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const amount = url.searchParams.get('amount')
    console.log(amount);
    

    if(!id) return new Response("Missing id", {status: 400})
    if(!amount) return new Response("Missing amount", {status: 400})

    const results = await db.query.weights.findMany({
        where: eq(weights.exerciseId, parseInt(id)),
        limit: parseInt(amount),
        orderBy: [desc(weights.id)]
    })
    
    
    if(!results) return new Response("Something went wrong trying to get the data", {status: 400})

    return new Response(JSON.stringify(results))
    
}
