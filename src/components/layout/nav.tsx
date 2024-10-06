import Link from "next/link"
import {
    ChartLineIcon,
    Cpu,
    Gauge,
    ListIcon,
    ThermometerIcon,
} from "lucide-react"

export default async function Navigation({ className }: { className: string }) {
    return <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
            <ChartLineIcon className="h-4 w-4" />
            Readings
        </Link>
    </nav>
}