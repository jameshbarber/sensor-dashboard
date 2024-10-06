import Device from "@/models/Device";
import Database from "@/services/database"

export const revalidate = 0;
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
    await Database.connect()
    const devices = await Device.find().sort({ created: -1 })
    await Database.close()
    return Response.json(devices, { status: 200 })
}