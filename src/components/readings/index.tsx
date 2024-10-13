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
import { DeviceLineCharts } from "@/app/readings/charts"

const HumidityChart = () => {

    const [dates, setDates] = useState({
        from: new Date(Date.now() - 24 * 60 * 60 * 1000),
        to: new Date()
    })

    const { data } = useAPI(`readings/humidity?from=${dates.from?.toISOString()}&to=${dates.to?.toISOString()}&scale=hour`)


    return <Card>
        <CardHeader>
            <CardTitle>Humidity</CardTitle>
            <CardDescription>Last 24h</CardDescription>
        </CardHeader>
        <CardContent style={{ minHeight: "250px", width: "100%" }}>
            <div style={{ height: "250px", width: "100%" }}>
                {data && <DeviceLineCharts data={data}  />}
            </div>
        </CardContent>
    </Card>
}

const TemperatureChart = () => {
    
        const [dates, setDates] = useState({
            from: new Date(Date.now() - 24 * 60 * 60 * 1000),
            to: new Date()
        })
    
        const { data } = useAPI(`readings/temperature?from=${dates.from?.toISOString()}&to=${dates.to?.toISOString()}&scale=hour`)
    
        return <Card>
            <CardHeader>
                <CardTitle>Temperature</CardTitle>
                <CardDescription>Last 24h</CardDescription>
            </CardHeader>
            <CardContent style={{ minHeight: "250px", width: "100%" }}>
                <div style={{ height: "250px", width: "100%" }}>
                    {data && <DeviceLineCharts data={data} />}
                </div>
            </CardContent>
        </Card>
}


export { HumidityChart, TemperatureChart }