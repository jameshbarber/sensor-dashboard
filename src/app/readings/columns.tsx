"use client"

import { ColumnDef } from "@tanstack/react-table"
import {DateTime} from "luxon"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reading = {
  _id: string
  device_id: string,
  data: {
    temperature: number,
    humidity: number,
  }
  created: number
}

export const columns: ColumnDef<Reading>[] = [
  {
    accessorKey: "created",
    header: "Timestamp",
    cell: (item) => DateTime.fromMillis(Number(item.getValue())).toRelative()
  },
  {
    accessorKey: "device_id",
    header: "Device",
  },
  {
    accessorKey: "data.temperature",
    header: "Temperature",
  },
  {
    accessorKey: "data.humidity",
    header: "Humidity",
  },
]
