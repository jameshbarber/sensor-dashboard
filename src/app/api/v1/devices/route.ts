import Device from "@/models/Device";
import connectDB from "@/services/database";

export const revalidate = 0;
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
    await connectDB()
    const devices = await Device.find().sort({ created: -1 })
    return Response.json(devices, { status: 200 })
}

export async function POST(req: Request) {

    const body = await req.json()
    console.log(body)
    const {_id, location, shade} = body
    if (!_id || !location) return Response.json({ error: "Missing required fields" }, { status: 400 })
    
    await connectDB()
    const device = await Device.create(body)
    return Response.json(device, { status: 201 })
}