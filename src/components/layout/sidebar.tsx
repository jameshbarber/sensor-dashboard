'use server'

import Link from "next/link"
import {
  Cpu,
  Gauge,
  ThermometerIcon,
} from "lucide-react"

import { StatusIndicator } from "@/components/status"

import Image from "next/image"
import Reading from "@/models/Reading"
import Database from "@/services/database"
import { Card, CardContent } from "../ui/card"

export default async function Sidebar() {

  await Database.connect()
  const readings = await Reading.find().sort({ created: -1 }).limit(1)
  // await Database.close()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image width={24} height={24} src="/logo.png" alt="logo" />
            <span className="">Sensor Dashboard</span>
          </Link>
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Gauge className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/devices"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Cpu className="h-4 w-4" />
              Devices
            </Link>
            <Link
              href="/readings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ThermometerIcon className="h-4 w-4" />
              Readings
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <StatusIndicator date={readings[0].created} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}