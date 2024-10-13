import Reading from "@/models/Reading";

const revalidate = 15;
const dynamic = 'force-dynamic'

export async function GET(req: Request, { params }: { params: { id: string } }) {

    const reading = await Reading.findOne({ device_id: params.id }).sort({ created: -1 }).exec()
    if (!reading) return Response.json({ lastSeen: null }, { status: 200 })

    return Response.json({ lastSeen: reading.created }, { status: 200 })

}