import { DateTime } from "luxon"

const FreshnessIndicator = ({ date }: { date: number }) => {

    const dt = DateTime.fromMillis(date ?? 0)
    const now = DateTime.now()

    const diff = now.diff(dt, ["days", "hours", "minutes"])
    const isFresh = diff.minutes < 15

    return <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isFresh ? "bg-green-500" : "bg-red-500"}`}></div>
        <div>{dt.toRelative()}</div>
    </div>
}

export default FreshnessIndicator