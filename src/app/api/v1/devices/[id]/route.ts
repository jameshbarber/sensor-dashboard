import Device from "@/models/Device"
import Reading from "@/models/Reading"
import connectDB from "@/services/database"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await connectDB()
    await Device.deleteOne({ _id: params.id })
    await Reading.deleteMany({ device_id: params.id })

    return Response.json({ message: "Device deleted" }, { status: 200 })
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const device = await Device.findById(params.id)
    return Response.json(device, { status: 200 })
}