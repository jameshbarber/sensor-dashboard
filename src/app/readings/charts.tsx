'use client'
import LineChart from "@/components/charts";

export const DeviceLineCharts = ({ data }: { data: any}) => {

    if (!data) return "Loading..."

    const {devices, readings} = data
    return <LineChart data={readings} lines={devices} />
}

const ReadingCharts = ({ temperature, humidity }: { temperature: any[], humidity: any[] }) => {

    return <>
        <DeviceLineCharts data={temperature} />
        <DeviceLineCharts data={humidity} />
    </>
}

export default ReadingCharts;