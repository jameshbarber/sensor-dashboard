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

    return <Card>
        <CardHeader>
            <CardTitle>Readings</CardTitle>
            <CardDescription>Temperature & humidity</CardDescription>
        </CardHeader>
        <CardContent>
            {data && <ReadingCharts data={data} />}
        </CardContent>
    </Card>
}


export default ReadingGraph