import data from "./demo-data.json"
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReadingCharts from "./charts";

export default async function ReadingsPage() {

    return <>
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Readings</h1>
        </div>
        <Tabs defaultValue="charts">
            <TabsList>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="table">All Readings</TabsTrigger>
            </TabsList>
            <TabsContent value="charts">
                <ReadingCharts data={data}/>
            </TabsContent>
            <TabsContent value="table">
                <div className="flex flex-1" x-chunk="dashboard-02-chunk-1">
                    <DataTable columns={columns} data={data} />
                </div>
            </TabsContent>
        </Tabs>

    </>
}
