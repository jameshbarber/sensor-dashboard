'use client'
import LineChart from "@/components/charts";
import { Reading } from "./columns";
import { DateTime } from "luxon";
import { useAPI } from "@/lib/useData";

const timescaleMap = {
    hour: "MMM dd HH:00",
    day: "MMM dd",
    week: "week W",
    month: "MMM yyyy",
}

export const mergedData = (data: Reading[], key: "temperature" | "humidity", timescale: Timescale) => {
    
    // Here we turn all readings into an object where the key is the device ID and group the timestamps by the timescale
    let devices: string[] = []
    const mapped = data.map((reading: Reading) => {
        if (!devices.includes(reading?.device_id)) devices.push(reading?.device_id)
        return {
            [reading?.device_id]: reading?.data?.[key],
            timestamp: DateTime.fromMillis(reading.created).toFormat(timescaleMap[timescale])
        }
    })

    // Here, we 
    let buckets: any[] = []
    let bucketReadings: any = {}

    mapped.forEach((reading: any) => {
        const timestamp = reading?.timestamp
        const exists = buckets.find((b: any) => b.timestamp === timestamp)

        if (!!exists) {
            const index = buckets.indexOf(exists)
            buckets[index] = {
                ...buckets[index],
                ...reading
            }
            bucketReadings[timestamp] = [...bucketReadings[timestamp], reading]
        } else {
            buckets.push(reading)
            bucketReadings[timestamp] = [reading]
        }
    })

    // At this point, we have an array of objects for each timestamp bucket, with the last reading for each device
    // We can now calculate the average for each timestamp bucket

    buckets = buckets.map((bucket: any) => {
        const values = bucketReadings[bucket.timestamp].map((r: any) => r[bucket[]])
        const average = values.reduce((a: number, b: number) => a + b, 0) / values.length
        return {
            ...bucket,
            [key]: average
        }
    })


    return {
        devices,
        readings: buckets
    }

}

export const DeviceLineCharts = ({ data, dataKey, timescale, deviceIds }: { deviceIds?: string[],data: Reading[], dataKey: "temperature" | "humidity", timescale: Timescale }) => {
    const { readings, devices } = mergedData(data, dataKey, timescale)
    return <LineChart data={readings} lines={deviceIds ?? devices} />
}

export type Timescale = "hour" | "day" | "week" | "month"
const ReadingCharts = ({ from, to, timescale, devices }: { from: Date, to: Date, timescale: Timescale, devices?: string[] }) => {

    const { data } = useAPI(`readings?from=${from?.toISOString()}&to=${to?.toISOString()}`)

    if (!data) return "Loading..."

    return <>
        <DeviceLineCharts deviceIds={devices} timescale={timescale} dataKey="temperature" data={data} />
        <DeviceLineCharts deviceIds={devices} timescale={timescale} dataKey="humidity" data={data} />
    </>
}

export default ReadingCharts;