
import { DateTime } from 'luxon';
import Reading from "@/models/Reading";
import connectDB from "@/services/database";
import { NextRequest } from 'next/server';

type ReadingData = {
    device_id: string;
    data: {
        temperature: number;
        humidity: number;
    };
    created: number;
};

type DeviceReadings = {
    [device_id: string]: any;
};

type BucketReading = DeviceReadings & {
    timestamp: string;
    [key: string]: string;
};

type AggregatedData = {
    devices: string[];
    readings: BucketReading[];
};

export const revalidate = 10;
export const dynamic = "force-dynamic";

const timescaleMap: { [key: string]: string } = {
    hour: "MMM dd HH:00",
    day: "MMM dd",
    week: "week W",
    month: "MMM yyyy",
};

// Helper function to format timestamps based on timescale
const formatTimestamp = (timestamp: number, timescale: keyof typeof timescaleMap): string => {
    return DateTime.fromMillis(timestamp).toFormat(timescaleMap[timescale]);
};

const groupAndAggregateReadings = (
    readings: ReadingData[],
    key: "temperature" | "humidity",
    timescale: keyof typeof timescaleMap
): AggregatedData => {
    let devices: string[] = [];
    let bucketReadings: { [timestamp: string]: { [device_id: string]: number[] } } = {};

    readings.forEach((reading) => {
        // Ensure the reading has valid data for the specified key
        if (!reading.data || typeof reading.data[key] === "undefined") return;

        const { device_id, created, data } = reading;
        const timestamp = formatTimestamp(created, timescale);

        // Initialize device in devices array if not already present
        if (!devices.includes(device_id)) devices.push(device_id);

        // Initialize bucket for this timestamp if not already present
        if (!bucketReadings[timestamp]) {
            bucketReadings[timestamp] = {};
        }

        // Initialize the array for this device and timestamp if not already present
        if (!bucketReadings[timestamp][device_id]) {
            bucketReadings[timestamp][device_id] = [];
        }

        // Add the value (temperature or humidity) to the array for this device and timestamp
        bucketReadings[timestamp][device_id].push(data[key]);
    });

    // Process and calculate the average for each device in each timestamp
    const buckets: BucketReading[] = Object.keys(bucketReadings).map((timestamp) => {
        const deviceValues = bucketReadings[timestamp];
        let aggregatedDevices: DeviceReadings = {};

        Object.keys(deviceValues).forEach((device_id) => {
            const values = deviceValues[device_id];
            const average = values.reduce((a, b) => a + b, 0) / values.length;
            aggregatedDevices[device_id] = average;
        });

        return {
            timestamp,
            ...aggregatedDevices // Spread the aggregated values for each device into the bucket
        };
    });

    return {
        devices,
        readings: buckets
    };
};

export async function GET(req: NextRequest, {params}: { params: {type: string} }) {
    const url = new URL(req.url);
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const timescale = (url.searchParams.get('scale') || 'day') as keyof typeof timescaleMap;

    const key = params.type

    await connectDB();

    const filter: any = {};
    if (from) filter.created = { $gte: new Date(from) };
    if (to) filter.created = filter.created ? { ...filter.created, $lte: new Date(to) } : { $lte: new Date(to) };

    const readings = await Reading.find(filter).sort({ created: 1 });

    //   @ts-ignore
    const aggregatedData = groupAndAggregateReadings(readings, key, timescale);

    return Response.json(aggregatedData, { status: 200 });
}