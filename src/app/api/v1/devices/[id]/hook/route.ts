import Reading from "@/models/Reading"

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params
    const body = await req.json()

    await Reading.create({
        device_id: id,
        humidity: body.humidity,
        temperature: body.temperature,
        created: Date.now()
    })

    return new Response("ok", { status: 201 })
}