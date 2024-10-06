import { timeDifference } from "@/lib/utils"

const StatusIndicator = ({ date }) => {

    const relativeDate = timeDifference(new Date(), new Date(date))
    const isFresh = Date.now() - date < 120 * 1000

    return <div>
        <div style={{width: "4px", height: "4px", background: isFresh ? "blue" : "red"}}></div>Last Updated: {relativeDate}
    </div>
}


export { StatusIndicator }