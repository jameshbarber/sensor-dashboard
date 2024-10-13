'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReadingCharts from "./charts";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useState } from "react";

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


const Table = ({ from, to }: { from: Date, to: Date }) => {

    const { data } = useAPI(`readings?from=${from?.toISOString()}&to=${to?.toISOString()}`)

    return <div className="flex w-full">
        <DataTable loading={!data} columns={columns} data={data} />
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
            </TabsList>
            <TabsContent value="charts">
                <ReadingCharts temperature={temperatureReadings} humidity={humidityReadings} />
            </TabsContent>
            <TabsContent value="table">
                <Table {...data}></Table>
            </TabsContent>
        </Tabs>

    </>
}
