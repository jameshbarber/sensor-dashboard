import { LineChart as BaseLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const colours = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d7305f", "#e0e0e0"]

const LineChart = ({ data, lines, style }: { data: any, lines: string[], style?: React.CSSProperties }) => (

    <div style={{ width: "100%", height: "60vh", ...style }}>
        <ResponsiveContainer>
            <BaseLineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {lines.map((line, index) => <Line key={index} type="monotone" dataKey={line} stroke={colours?.[index] ?? colours[0]} />)}
                <XAxis dataKey="timestamp" />
                <YAxis width={50} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
            </BaseLineChart>
        </ResponsiveContainer>
    </div>
);

export default LineChart