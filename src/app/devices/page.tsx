import ClientMap from "@/components/map";
import Device from "@/models/Device";
import Database from "@/services/database";

export default async function DevicePage() {


    await Database.connect()
    const devices = await Device.find().sort({ created: -1 })
    // await Database.close()
    const ds = devices.map(d => d.location)

    const featureJSON = JSON.parse(JSON.stringify(ds))

    return <>
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Devices</h1>
        </div>
        <div
            className="flex flex-1 items-center justify-center" x-chunk="dashboard-02-chunk-1"
        >
            <ClientMap features={featureJSON} />
        </div>
    </>
}
