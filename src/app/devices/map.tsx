import dynamic from "next/dynamic";
import { Device } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

const ClientMap = dynamic(() => import('@/components/map'), { ssr: false });

export default function DeviceMap({ devices, loading, ...props }: { devices: Device[], center?: { lat: number, lng: number }, loading?: boolean }) {

    if (loading) return <Skeleton className="w-full h-[80vh]" />

    const ds = devices.map(d => ({
        name: d._id,
        shade: d.shade,
        icon: d.shade ? "shade" : "no-shade",
        ...d.location
    }))

    return <div
        className="flex flex-1 items-center justify-center" x-chunk="dashboard-02-chunk-1"
    >
        <div className="w-full rounded-lg overflow-hidden">
            <ClientMap style={{ width: "100%" }} config={{ pitch: 0, zoom: 16 }} coordinates={props.center ?? { lat: -33.9575, lng: 18.4607 }} features={ds} {...props} />
        </div>
    </div>
}
