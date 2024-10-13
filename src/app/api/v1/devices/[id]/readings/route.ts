import Reading from "@/models/Reading"

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const readings = await Reading.find({ device_id: params.id }).sort({ created: -1 })
    return Response.json(readings, { status: 200 })
}