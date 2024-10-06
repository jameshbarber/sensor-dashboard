import Device from "@/models/Device";
import Database from "@/services/database";
import dynamic from "next/dynamic";

const ClientMap = dynamic(() => import('@/components/map'), { ssr: false });

export default async function DevicePage() {


    await Database.connect()
    const devices = await Device.find().sort({ created: -1 })

    console.log(devices)
    // await Database.close()
    const ds = devices.map(d => ({
        name: d._id,
        ...d.location
    }))

    const featureJSON = JSON.parse(JSON.stringify(ds))

    return <>
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Devices</h1>
        </div>
        <div
            className="flex flex-1 items-center justify-center" x-chunk="dashboard-02-chunk-1"
        >
            <div style={{ width: "100%"}}>
                <ClientMap style={{ width: "100%"}} config={{ pitch: 0, zoom: 16 }} coordinates={{ lat: -33.9575, lng: 18.4607 }} features={featureJSON} />
            </div>
        </div>
    </>
}
