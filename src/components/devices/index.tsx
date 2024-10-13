'use client'

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
import { Device } from "@/app/devices/columns"

const ClientMap = dynamic(() => import('@/components/map'), { ssr: false });


export const DeviceMap = ({devices}: {devices: Device[]}) => {

    const ds = devices?.map((d: Device) => ({
        name: d._id,
        shade: d.shade,
        icon: d.shade ? "shade" : "no-shade",
        ...d.location
    }))

    return <Card>
        <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>Assigned locations</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <ClientMap style={{ width: "100%", height: "250px" }} config={{ pitch: 0, zoom: 12 }} coordinates={{ lat: -33.9575, lng: 18.4607 }} features={devices ? ds : []} />
        </CardContent>
    </Card>
}

const WrappedDeviceMap = () => {
    const { data } = useAPI('devices')
    if (!data) return "Loading..."

    return <DeviceMap devices={data} />
}



export default WrappedDeviceMap
