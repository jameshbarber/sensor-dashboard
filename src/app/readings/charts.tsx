'use client'
import LineChart from "@/components/charts";
import { Reading } from "./columns";
import { DateTime } from "luxon";

const ReadingCharts = ({ data }: { data: Reading[] }) => {

    const mapped = data.sort((a, b) => a.created - b.created).map((reading: Reading) => ({
        temp: reading.data.temperature,
        device: reading.device_id,
        timestamp: DateTime.fromMillis(reading.created).toRelative(),
        humidity: reading.data.humidity,
    }))

    return <>
        <LineChart data={mapped} lines={["temp", "humidity"]} />
    </>
}

export default ReadingCharts;