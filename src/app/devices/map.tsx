import dynamic from "next/dynamic";
import { Device } from "./columns";

const ClientMap = dynamic(() => import('@/components/map'), { ssr: false });

export default function DeviceMap({ devices }: { devices: Device[] }) {

    // await Database.close()
    const ds = devices.map(d => ({
        name: d._id,
        shade: d.shade,
        icon: d.shade ? "shade" : "no-shade",
        ...d.location
    }))

    return <div
        className="flex flex-1 items-center justify-center" x-chunk="dashboard-02-chunk-1"
    >
        <div style={{ width: "100%" }}>
            <ClientMap style={{ width: "100%" }} config={{ pitch: 0, zoom: 16 }} coordinates={{ lat: -33.9575, lng: 18.4607 }} features={ds} />
        </div>
    </div>
}
