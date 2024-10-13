import { DateTime } from "luxon"

const FreshnessIndicator = ({ date }: { date: number }) => {

    if (!date) return <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full bg-gray-200`}></div>
        <div>No data</div>
    </div>

    const dt = DateTime.fromMillis(date)
    const isFresh = Date.now() - date < 15 * 60 * 1000

    return <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isFresh ? "bg-green-500" : "bg-red-500"}`}></div>
        <div>{dt.toRelative()}</div>
    </div>
}

export default FreshnessIndicator