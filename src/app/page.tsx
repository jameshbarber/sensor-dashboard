import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { HumidityChart, TemperatureChart } from "@/components/readings"
import DeviceCard from "@/components/devices"

export default async function Dashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="flex flex-col gap-2">
            <TemperatureChart height={200}></TemperatureChart>
            <HumidityChart></HumidityChart>
          </div>
        </ResizablePanel>
        <ResizableHandle style={{ marginLeft: "24px", marginRight: "24px" }} />
        <ResizablePanel>
          <DeviceCard />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
