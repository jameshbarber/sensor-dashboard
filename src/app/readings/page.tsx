'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReadingCharts from "./charts";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { HeatmapLegend } from "@/components/map/heat";


const ClientMap = dynamic(() => import('@/components/map/heat'), { ssr: false });

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAPI } from "@/lib/useData";

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dynamic from "next/dynamic";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const autoTimeScale = (from: Date, to: Date): Timescale => {
    const diff = to.getTime() - from.getTime()
    if (diff < 1000 * 60 * 61) return "hour"
    if (diff < 1000 * 60 * 60 * 25) return "day"
    if (diff < 1000 * 60 * 60 * 24 * 8) return "week"
    return "month"
}

const TimescaleSelector = ({ onChange, value, disabled }: { onChange: (t: Timescale) => void, value: Timescale, disabled: boolean }) => {
    return <Select disabled={disabled} value={value} onValueChange={onChange}>
        <SelectTrigger>
            <SelectValue placeholder="Select a timescale" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Timescales</SelectLabel>
                <SelectItem value="hour">Hour</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
}

const SensorSelector = ({ setSelected, selected }: { setSelected: (s: string[]) => void, selected: string[] }) => {

    const { data } = useAPI('devices')

    React.useEffect(() => {
        if (data) {
            setSelected(data.map((d: any) => d._id))
        }
    }, [data])

    const onCheckedChange = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(s => s !== id))
        } else {
            setSelected([...selected, id])
        }
    }

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            {data?.map((d: any) => {
                return <DropdownMenuCheckboxItem
                    checked={selected.includes(d._id)}
                    onCheckedChange={() => onCheckedChange(d._id)}>
                    {d._id}
                </DropdownMenuCheckboxItem>
            })}
        </DropdownMenuContent>
    </DropdownMenu>
}


const HeatMap = ({ from, to, timescale }: { from: Date, to: Date, timescale: Timescale }) => {
    const { data } = useAPI(`readings/temperature?from=${from?.toISOString()}&to=${to?.toISOString()}&scale=${timescale}`)
    const { data: deviceData } = useAPI(`devices`)

    if (!data || !deviceData) return "Loading..."

    const { devices, readings } = data

    const mapped = devices.map((device_id: any) => {

        const device = deviceData.find((d: any) => d._id === device_id)
        // Loop through the readings and aggregate temp for given device
        let sum = 0;
        let count = 0;

        console.log("Device", device_id)
        for (let i = 0; i < readings.length; i++) {
            console.log(readings[i])
            if (readings[i][device_id]) {
                console.log("Foudn a reading for", device_id, readings[i][device_id])
                sum += readings[i][device_id]
                count++
            }
        }

        const avg = sum / count

        console.log("The average", avg)

        return {
            id: device.id,
            temperature: avg,
            shade: device.shade,
            icon: device.shade ? "shade" : "no-shade",
            ...device.location
        }
    })

    let maxTemp = 0;
    let minTemp = 0;

    for (let i = 0; i < mapped.length; i++) {
        if (!maxTemp || !minTemp) {
            maxTemp = mapped[i].temperature;
            minTemp = mapped[i].temperature;
        }
        if (mapped[i].temperature > maxTemp) maxTemp = mapped[i].temperature;
        if (mapped[i].temperature < minTemp) minTemp = mapped[i].temperature;
    }

    console.log(maxTemp, minTemp)

    return <>
        <h1 className="">Temperature Heat Map</h1>
        <HeatmapLegend maxTemp={maxTemp + 5} minTemp={minTemp - 5} />

        {data && <ClientMap bounds={{max: maxTemp + 5, min: minTemp - 5}} style={{ width: "100%" }} config={{ pitch: 0, zoom: 16 }} coordinates={{ lat: -33.9575, lng: 18.4607 }} features={mapped} />}
    </>
}


const Table = ({ from, to }: { from: Date, to: Date }) => {

    const { data } = useAPI(`readings?from=${from?.toISOString()}&to=${to?.toISOString()}`)

    if (!data) return "Loading..."

    return <div className="flex w-full">
        <DataTable columns={columns} data={data} />
    </div>
}

export type Timescale = "hour" | "day" | "week" | "month"


export default function ReadingsPage() {

    const [tab, setTab] = useState("charts")
    const [data, setData] = useState({
        from: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        to: new Date(), // today
    })

    const [timescale, setTimescale] = useState<Timescale>("day")

    const { data: temperatureReadings } = useAPI(`readings/temperature?from=${data?.from?.toISOString()}&to=${data?.to?.toISOString()}&scale=${timescale}`)
    const { data: humidityReadings } = useAPI(`readings/humidity?from=${data?.from?.toISOString()}&to=${data?.to?.toISOString()}&scale=${timescale}`)

    const [selected, setSelected] = useState<string[]>([])

    const handleTabChange = (value: string) => {
        setTab(value)
        if (value === 'map') {
            setTimescale(autoTimeScale(data.from, data.to))
        }
    }

    return <>
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Readings</h1>
            <div className="flex gap-2">
                <div className="flex gap-2">
                    {/* @ts-ignore */}
                    <DatePickerWithRange setDate={setData} date={data} />
                    <TimescaleSelector disabled={tab === 'map'} value={timescale} onChange={setTimescale} />
                </div>
                {/* <SensorSelector selected={selected} setSelected={setSelected} /> */}
            </div>
        </div>
        <Tabs defaultValue={"charts"} value={tab} onValueChange={handleTabChange}>
            <TabsList>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
                {/* <TabsTrigger value="map">Map</TabsTrigger> */}
            </TabsList>
            <TabsContent value="charts">
                <ReadingCharts temperature={temperatureReadings} humidity={humidityReadings} />
            </TabsContent>
            <TabsContent value="table">
                <Table {...data}></Table>
            </TabsContent>
            {/* <TabsContent value="map">
                <HeatMap {...data} timescale={timescale}></HeatMap>
            </TabsContent> */}
        </Tabs>

    </>
}
