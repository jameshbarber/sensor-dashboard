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
import { Skeleton } from "../ui/skeleton"
import FreshnessIndicator from "../ui/freshness-indicator"

interface ChartCardProps {
    height?: number | string
    data: any,
    title: string,
    description: string
}

const WrappedFreshnessIndicator = ({ id }: { id: string }) => {
    const {data} = useAPI(`devices/${id}/status`)
    const date = data?.lastSeen
    return <FreshnessIndicator date={date} />
}

const ChartCard = ({ height, data, title, description }: ChartCardProps) => {
    const heightIsNumber = typeof height === "number"
    const minHeight = heightIsNumber ? `${height}px` : height
    height = heightIsNumber ? `${height}px` : height

    return <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent style={{ minHeight, width: "100%", padding: "0", paddingRight: "24px", paddingBottom: "32px" }}>
            <div style={{ height, width: "100%" }}>
                {data ? <DeviceLineCharts style={{ height: height }} data={data} /> : <Skeleton className="w-full" style={{height: height, marginLeft: "24px", width: "calc(100% - 24px)"}} />}
            </div>
        </CardContent>
    </Card>
}

const HumidityChart = () => {

    const [dates, setDates] = useState({
        from: new Date(Date.now() - 24 * 60 * 60 * 1000),
        to: new Date()
    })

    const { data } = useAPI(`readings/humidity?from=${dates.from?.toISOString()}&to=${dates.to?.toISOString()}&scale=hour`)


    return <ChartCard
        title="Humidity"
        description="Last 24h"
        data={data}
        height={200}
    />
}

const TemperatureChart = ({ height }: { height?: number | string }) => {

    const [dates, setDates] = useState({
        from: new Date(Date.now() - 24 * 60 * 60 * 1000),
        to: new Date()
    })

    const { data } = useAPI(`readings/temperature?from=${dates.from?.toISOString()}&to=${dates.to?.toISOString()}&scale=hour`)

    return <ChartCard
        title="Temperature"
        description="Last 24h"
        data={data}
        height={height || 200}
    />
}


export { HumidityChart, TemperatureChart, ChartCard }