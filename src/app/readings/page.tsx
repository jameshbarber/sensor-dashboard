'use client'

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
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


const TimescaleSelector = ({ onChange, value }) => {
    return <Select value={value} onValueChange={onChange}>
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

export type Timescale = "hour" | "day" | "week" | "month" | "year"


export default function ReadingsPage() {

    const [data, setData] = useState({
        from: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        to: new Date(), // today
    })
    const [timescale, setTimescale] = useState<Timescale>("day")

    return <>
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Readings</h1>
            <div className="flex">
                <DatePickerWithRange setDate={setData} date={data} />
                <TimescaleSelector value={timescale} onChange={setTimescale} />
            </div>
        </div>
        <Tabs defaultValue="charts">
            <TabsList>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="table">All Readings</TabsTrigger>
            </TabsList>
            <TabsContent value="charts">
                <ReadingCharts from={data?.from} to={data?.to} timescale={timescale} />
            </TabsContent>
            <TabsContent value="table">
                <div className="flex flex-1" x-chunk="dashboard-02-chunk-1">
                    <DataTable columns={columns} data={data} />
                </div>
            </TabsContent>
        </Tabs>

    </>
}
