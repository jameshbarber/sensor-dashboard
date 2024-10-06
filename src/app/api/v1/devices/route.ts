import Device from "@/models/Device";
import connectDB from "@/services/database";

export const revalidate = 0;
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
    await connectDB()
    const devices = await Device.find().sort({ created: -1 })
    return Response.json(devices, { status: 200 })
}