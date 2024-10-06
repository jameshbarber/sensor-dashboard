'use client'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import dynamic from "next/dynamic"
import { useAPI } from "@/lib/useData"
import { DataTable } from "../ui/data-table"

const ClientMap = dynamic(() => import('@/components/map'), { ssr: false });

const DeviceCard = () => {

    const { data } = useAPI('devices')
    // await Database.close()

    if (!data) return "Loading..."

    const ds = data?.map((d: any) => ({
        name: d._id,
        ...d.location
    }))

    return <Card>
        <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>Assigned locations</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <ClientMap style={{ width: "100%", height: "250px" }} config={{ pitch: 0, zoom: 16 }} coordinates={{ lat: -33.9575, lng: 18.4607 }} features={ds} />
        </CardContent>
        <CardFooter>
            Last updated: {new Date().toLocaleString()}
        </CardFooter>
    </Card>
}

export default DeviceCard
