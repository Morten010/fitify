import { db } from '@/src/db'

export async function GET(req: Request, res: Response) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    

    if(!id) return new Response("Missing id", {status: 400})

    const results = await db.query.workouts.findMany()
    
    if(!results) return new Response("Something went wrong trying to get the data", {status: 400})

    return new Response(JSON.stringify(results))
    
}
