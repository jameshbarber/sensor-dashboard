import Reading from "@/models/Reading";
import connectDB from "@/services/database";

export const revalidate = 10;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const url = new URL(req.url);
    
    const from = url.searchParams.get('from'); // Start date (greater than or equal)
    const to = url.searchParams.get('to');     // End date (less than or equal)

    await connectDB();

    // Define filter for date range
    const filter: any = {};
    if (from) filter.created = { $gte: new Date(from) };
    if (to) {
        filter.created = filter.created ? { ...filter.created, $lte: new Date(to) } : { $lte: new Date(to) };
    }

    // Fetch readings with date filtering and limit
    const readings = await Reading.find(filter).sort({ created: 1 })
    
    // Return the filtered readings
    return new Response(JSON.stringify(readings), { status: 200 });
}