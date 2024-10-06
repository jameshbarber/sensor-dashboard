import Reading from "@/models/Reading"
import Database from "@/services/database"

export const revalidate = 0;
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
    await Database.connect()
    const readings = await Reading.find().sort({ created: -1 }).limit(100)
    await Database.close()
    return Response.json(readings, {status: 200})
}