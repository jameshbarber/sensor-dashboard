import { LineChart as BaseLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart = ({ data, lines }: { data: any, lines: string[] }) => (
    <div style={{ width: "100%", height: "60vh" }}>
        <ResponsiveContainer>
            <BaseLineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {lines.map((line, index) => <Line key={index} type="monotone" dataKey={line} stroke="#8884d8" />)}
                <XAxis dataKey="timestamp" />
                <YAxis width={50} />
                <Tooltip />
            </BaseLineChart>
        </ResponsiveContainer>
    </div>
);

export default LineChart