import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import ReadingGraph from "@/components/readings"
import DeviceCard from "@/components/devices"

{/* <div>
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div> */}

export default async function Dashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">All Sensors</h1>
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <ReadingGraph />
        </ResizablePanel>
        <ResizableHandle style={{ marginLeft: "24px", marginRight: "24px" }} />
        <ResizablePanel>
          <DeviceCard />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
