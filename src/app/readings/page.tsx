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
import { useAPI } from "@/lib/useData";

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function DropdownMenuCheckboxes() {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                >
                    Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                    disabled
                >
                    Activity Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                >
                    Panel
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



const TimescaleSelector = ({ onChange, value }: {onChange: (t: Timescale) => void, value: Timescale}) => {
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

const SensorSelector = ({ setSelected, selected }: {setSelected: (s: string[])=>void, selected: string[]}) => {

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

export type Timescale = "hour" | "day" | "week" | "month" | "year"


export default function ReadingsPage() {

    const [data, setData] = useState({
        from: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        to: new Date(), // today
    })

    const [timescale, setTimescale] = useState<Timescale>("day")
    const [selected, setSelected] = useState<string[]>([])

    return <>
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Readings</h1>
            <div className="flex gap-2">
                <div className="flex gap-2">
                    {/* @ts-ignore */}
                    <DatePickerWithRange setDate={setData} date={data} />
                    <TimescaleSelector value={timescale} onChange={setTimescale} />
                </div>
                <SensorSelector selected={selected} setSelected={setSelected} />
            </div>
        </div>
        <Tabs defaultValue="charts">
            <TabsList>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="table">All Readings</TabsTrigger>
            </TabsList>
            <TabsContent value="charts">
                <ReadingCharts devices={selected} from={data?.from} to={data?.to} timescale={timescale} />
            </TabsContent>
            <TabsContent value="table">
                <div className="flex flex-1" x-chunk="dashboard-02-chunk-1">
                    {/* <DataTable columns={columns} data={data} /> */}
                </div>
            </TabsContent>
        </Tabs>

    </>
}
