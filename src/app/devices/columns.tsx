"use client"
import { Cloud, Sun, Trash } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import ConfirmDeletionAlert from "./alerts/delete"
import Network from "@/lib/network"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Device = {
    _id: string
    shade: boolean
    data: {
        temperature: number,
        humidity: number,
    }
    location: {
        latitude: number,
        longitude: number,
    }
}

export const columns: ColumnDef<Device>[] = [
    {
        accessorKey: "shade",
        header: "",
        cell: ({ row }) => {
            const device = row.original
            return device.shade ? <Sun></Sun> : <Cloud></Cloud>
        }
    },
    {
        accessorKey: "_id",
        header: "Device ID",
        cell: ({ row }) => {
            const device = row.original
            return <Link href={`/devices/${device._id}`}>
                {device._id}
            </Link>
        }
    },
    {
        accessorKey: "location.latitude",
        header: "Latitude",
    },
    {
        accessorKey: "location.longitude",
        header: "Longitude",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const device = row.original

            const handleDeletion = async () => {
                await Network.delete(`/api/v1/devices/${device._id}`)
            }

            return (<>
                <ConfirmDeletionAlert handler={handleDeletion}>
                    <Trash size={16} />
                </ConfirmDeletionAlert>
            </>
            )
        },
    },
]
