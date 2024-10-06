'use client'
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAPI } from "@/lib/useData"
import ReadingCharts from "@/app/readings/charts"



const ReadingGraph = () => {
    const {data} = useAPI('readings')

    const dates = {
        from: new Date(Date.now() - 30 * 60 * 1000),
        to: new Date()
    }

    return <Card>
        <CardHeader>
            <CardTitle>Readings</CardTitle>
            <CardDescription>Last 30 mins</CardDescription>
        </CardHeader>
        <CardContent>
            {data && <ReadingCharts timescale="hour" from={dates.from} to={dates.to}/>}
        </CardContent>
    </Card>
}


export default ReadingGraph