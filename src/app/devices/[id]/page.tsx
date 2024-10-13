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
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/ui/code-block";
import FreshnessIndicator from "@/components/ui/freshness-indicator";
import CopyButton from "@/components/ui/copy-button";

const WebhookInstructionSection = ({ id }: { id: string }) => {

    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'

    return <div>
        <Card className="p-4 p-y-4 border-dashed shadow-none text-center flex flex-col gap-4">
            <div>
                <h3 className="text-lg font-semibold">Sending data</h3>
                <p className="text-sm text-gray-500">Send data to this device using the following webhook URL</p>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Input className="border-none" value={`${origin}/api/v1/devices/${id}/hook`} disabled style={{ cursor: "auto" }} />
                <CopyButton data={`${origin}/api/v1/devices/${id}/hook`} />
            </div>

            <div className="text-left">
                Payload example:
                <CodeBlock code={`
{
    "temperature": 23.5,
    "humidity": 45.2
}
`} />
            </div>
        </Card>
    </div>
}

export default function DevicesPage({ params }: { params: { id: string } }) {

    const { data: device } = useAPI(`devices/${params.id}`)
    const { data: readings } = useAPI(`devices/${params.id}/readings`)

    const latestReading = readings?.[0]
    const seenLessThan15MinutesAgo = DateTime.fromISO(latestReading?.created).diffNow().minutes < 15

    return <>
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-lg font-semibold md:text-2xl">{device?._id}</h1>
                <FreshnessIndicator date={readings?.[0]?.created} />
            </div>
            <div className="flex gap-2">
                <div className="flex gap-2">
                </div>
            </div>
        </div>
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <div className="flex flex-col gap-2">
                    {!seenLessThan15MinutesAgo && <WebhookInstructionSection id={params.id} />}
                    <DataTable data={readings} columns={columns} loading={!readings} />
                </div>
            </ResizablePanel>
            <ResizableHandle style={{ marginLeft: "24px", marginRight: "24px" }} />
            <ResizablePanel>
                {device && <DeviceMap center={{ lat: device?.location?.latitude, lng: device?.location?.longitude }} devices={[device]} />}
            </ResizablePanel>
        </ResizablePanelGroup>
    </>
}
