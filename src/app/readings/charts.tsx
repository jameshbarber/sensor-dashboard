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

const mergedData = (data: Reading[], key: "temperature" | "humidity", timescale: Timescale) => {
    let devices: string[] = []
    const mapped = data.map((reading: Reading) => {
        if (!devices.includes(reading?.device_id)) devices.push(reading?.device_id)
        return {
            [reading?.device_id]: reading?.data?.[key],
            timestamp: DateTime.fromMillis(reading.created).toFormat(timescaleMap[timescale])
        }
    })

    let buckets: any[] = []
    mapped.forEach((reading: any) => {
        const timestamp = reading?.timestamp
        const exists = buckets.find((b: any) => b.timestamp === timestamp)

        if (!!exists) {
            console.log("exists", exists)
            const index = buckets.indexOf(exists)
            buckets[index] = {
                ...buckets[index],
                ...reading
            }
        } else {
            buckets.push(reading)
        }
    })


    return {
        devices,
        readings: buckets
    }

}

const DeviceLineCharts = ({ data, dataKey, timescale, deviceIds }: { deviceIds: string[],data: Reading[], dataKey: "temperature" | "humidity", timescale: Timescale }) => {
    const { readings } = mergedData(data, dataKey, timescale)
    return <LineChart data={readings} lines={deviceIds} />
}

export type Timescale = "hour" | "day" | "week" | "month" | "year"
const ReadingCharts = ({ from, to, timescale, devices }: { from: Date, to: Date, timescale: Timescale, devices: string[] }) => {

    const { data } = useAPI(`readings?from=${from?.toISOString()}&to=${to?.toISOString()}`)

    if (!data) return "Loading..."

    return <>
        <DeviceLineCharts deviceIds={devices} timescale={timescale} dataKey="temperature" data={data} />
        <DeviceLineCharts deviceIds={devices} timescale={timescale} dataKey="humidity" data={data} />
    </>
}

export default ReadingCharts;