import { db } from '@/src/db'
import { workouts } from '@/src/db/schema'
import { eq } from 'drizzle-orm'

export async function DELETE(req: Request, res: Response) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    console.log(id);
        

    if(!id) return new Response("Missing id", {status: 400})

    const results = await db.delete(workouts).where(eq(workouts.id, parseInt(id)))
    
    console.log(results);
    

    if(!results) return new Response("Something went wrong trying to delete the data", {status: 400})

    return new Response(JSON.stringify(results))
    
}
