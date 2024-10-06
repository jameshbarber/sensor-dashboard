import Reading from "@/models/Reading"
import connectDB from "@/services/database";

export const revalidate = 0;
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
    await connectDB()
    const readings = await Reading.find().sort({ created: -1 }).limit(100)
    return Response.json(readings, {status: 200})
}