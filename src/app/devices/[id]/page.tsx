'use client'

import { useAPI } from "@/lib/useData";
import { DateTime } from "luxon";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/readings/columns";
import DeviceMap from "../map";

export default function DevicesPage({ params }: { params: { id: string } }) {

    const { data: device } = useAPI(`devices/${params.id}`)
    const { data: readings } = useAPI(`devices/${params.id}/readings`)

    const latestReading = readings?.[0]
    const lastSeen = latestReading && DateTime.fromMillis(latestReading.created).toRelative()

    return <>
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-lg font-semibold md:text-2xl">{device?._id}</h1>
                <p className="text-sm text-gray-500">Last seen {lastSeen}</p>
            </div>
            <div className="flex gap-2">
                <div className="flex gap-2">

                </div>
                {/* <SensorSelector selected={selected} setSelected={setSelected} /> */}
            </div>
        </div>
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <div className="flex flex-col gap-2">
                    {readings && <DataTable data={readings} columns={columns} />}
                </div>
            </ResizablePanel>
            <ResizableHandle style={{ marginLeft: "24px", marginRight: "24px" }} />
            <ResizablePanel>
                {device && <DeviceMap center={{ lat:device?.location?.latitude, lng: device?.location?.longitude }} devices={[device]} />}
            </ResizablePanel>
        </ResizablePanelGroup>
    </>
}
