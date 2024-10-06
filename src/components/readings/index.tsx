'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAPI } from "@/lib/useData"
import { useState } from "react"
import SimpleLineChart from "../charts/simple"
import { mergedData, Timescale } from "@/app/readings/charts"
import { Reading } from "@/app/readings/columns"

const DeviceLineCharts = ({ data, dataKey, timescale, deviceIds }: { deviceIds?: string[], data: Reading[], dataKey: "temperature" | "humidity", timescale: Timescale }) => {
    const { readings, devices } = mergedData(data, dataKey, timescale)
    return <SimpleLineChart data={readings} lines={deviceIds ?? devices} />
}

const HumidityChart = () => {

    const [dates, setDates] = useState({
        from: new Date(Date.now() - 24 * 60 * 60 * 1000),
        to: new Date()
    })

    const { data } = useAPI(`readings?from=${dates.from?.toISOString()}&to=${dates.to?.toISOString()}`)


    return <Card>
        <CardHeader>
            <CardTitle>Humidity</CardTitle>
            <CardDescription>Last 24h</CardDescription>
        </CardHeader>
        <CardContent style={{ minHeight: "250px", width: "100%" }}>
            <div style={{ height: "250px", width: "100%" }}>
                {data && <DeviceLineCharts timescale="hour" dataKey="humidity" data={data} />}
            </div>
        </CardContent>
    </Card>
}

const TemperatureChart = () => {
    
        const [dates, setDates] = useState({
            from: new Date(Date.now() - 24 * 60 * 60 * 1000),
            to: new Date()
        })
    
        const { data } = useAPI(`readings?from=${dates.from?.toISOString()}&to=${dates.to?.toISOString()}`)
    
        return <Card>
            <CardHeader>
                <CardTitle>Temperature</CardTitle>
                <CardDescription>Last 24h</CardDescription>
            </CardHeader>
            <CardContent style={{ minHeight: "250px", width: "100%" }}>
                <div style={{ height: "250px", width: "100%" }}>
                    {data && <DeviceLineCharts timescale="hour" dataKey="temperature" data={data} />}
                </div>
            </CardContent>
        </Card>
}


export { HumidityChart, TemperatureChart }