"use client"

import { ColumnDef } from "@tanstack/react-table"

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
        accessorKey: "_id",
        header: "Device ID",
    },
    {
        accessorKey: "shaded",
        header: "Shaded",
    },
    {
        accessorKey: "location.latitude",
        header: "Latitude",
    },
    {
        accessorKey: "location.longitude",
        header: "Longitude",
    },
]
