'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAPI } from "@/lib/useData";

import DeviceMap from "./map";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import Network from "@/lib/network";
import { useRouter } from "next/navigation";


const MapInput = dynamic(() => import('@/components/map/location-picker'), { ssr: false });

interface FormDataType {
    _id?: string,
    location: {
        latitude: number,
        longitude: number,
        height?: number,
    },
    shade?: boolean,
}

const AddSensorFeature = ({ data, onChange, onSubmit }: { data: FormDataType, onChange: (key: string, value: any) => void, onSubmit: () => Promise<void> }) => {

    const router = useRouter()
    const ref = useRef<HTMLButtonElement>(null)

    const handleSubmission = async () => {
        await onSubmit()
        ref.current?.click()
        router.refresh()
    }

    return <div>
        <Dialog>
            <DialogTrigger ref={ref} asChild>
                <Button>Add Sensor</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a new Sensor</DialogTitle>
                    <DialogDescription>
                        To add a sensor, you need to assign it a unique ID, and provide it's location. You will then be able to send data from it via the webhook.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Unique ID
                        </Label>
                        <Input
                            onChange={(e) => onChange("_id", e.target.value)}
                            id="_id"
                            value={data?._id}
                            placeholder="sensor_2"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Shaded
                        </Label>
                        <Switch
                            onCheckedChange={(shade) => onChange("shade", shade)}
                            defaultChecked={data.shade}
                            checked={data.shade}
                        />
                    </div>
                    <Label className="text-left">
                        Location (click to place)
                    </Label>
                    <MapInput icon={data.shade ? `shade` : `no-shade`} value={data.location} onChange={(latLng) => (onChange("location", { latitude: latLng.latitude, longitude: latLng.longitude }))} />
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmission}>Add Sensor</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
}

export default function DevicesPage() {

    const { data } = useAPI('devices')

    const [formData, setData] = useState({
        _id: '',
        shade: false,
        location: {
            // Default cape town
            latitude: -33.95769644811561,
            longitude: 18.460866506282724
        }
    })

    const validateIDWithRegex = (id: string) => {
        // Exclude spaces 
        // if (id.includes(" ")) return false
        return /^[a-z0-9_-]+$/.test(id)
    }

    const handleFormDataChange = (key: string, value: any) => {
        if (key === "_id" && (!validateIDWithRegex(value) && value !== "")) return
        setData((prevData) => ({
            ...prevData,
            [key]: value
        }));
    }

    const handleSubmission = async () => {
        const res = await Network.post('/api/v1/devices', formData)
    }

    return <>
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Devices</h1>
            <div className="flex gap-2">
                <div className="flex gap-2">
                    <AddSensorFeature onSubmit={handleSubmission} onChange={handleFormDataChange} data={formData} />
                </div>
                {/* <SensorSelector selected={selected} setSelected={setSelected} /> */}
            </div>
        </div>
        <Tabs defaultValue={"table"}>
            <TabsList className="mb-2">
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
            <TabsContent value="map">
                <DeviceMap loading={!data} devices={data}></DeviceMap>
            </TabsContent>
            <TabsContent value="table">
                <div className="flex w-full">
                    <DataTable loading={!data} columns={columns} data={data} />
                </div>
            </TabsContent>
        </Tabs>
    </>
}
