'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAPI } from "@/lib/useData";

import { Button } from "@/components/ui/button";
import DeviceMap from "./map";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function DevicesPage() {

    const { data } = useAPI('devices')

    return <>
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Devices</h1>
            <div className="flex gap-2">
                <div className="flex gap-2">
                    {/* <Button onClick={() => setTab("map")}>Add Sensor</Button> */}
                </div>
                {/* <SensorSelector selected={selected} setSelected={setSelected} /> */}
            </div>
        </div>
        <Tabs defaultValue={"map"}>
            <TabsList>
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
            <TabsContent value="map">
                {data && <DeviceMap devices={data}></DeviceMap>}
            </TabsContent>
            <TabsContent value="table">
                <div className="flex w-full">
                    <DataTable columns={columns} data={data} />
                </div>
            </TabsContent>
        </Tabs>

    </>
}
