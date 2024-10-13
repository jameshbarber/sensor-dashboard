'use client'
import LineChart from "@/components/charts";
import { ChartCard } from "@/components/readings";

export const DeviceLineCharts = ({ data, ...props }: { data: any, style?: React.CSSProperties }) => {

    if (!data) return "Loading..."

    const { devices, readings } = data
    return <LineChart data={readings} lines={devices} {...props} />
}

const ReadingCharts = ({ temperature, humidity, ...props }: { temperature: any[], humidity: any[], style?: React.CSSProperties }) => {

    return <div className="flex flex-col gap-2">
        <ChartCard
            data={temperature}
            title="Temperature"
            description={""}
            height={600}
        />

        <ChartCard
            data={humidity}
            title="Humidity"
            description={""}
            height={600}
        />
    </div>
}

export default ReadingCharts;