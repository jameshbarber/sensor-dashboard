import { LineChart as BaseLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const colours = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d7305f", "#e0e0e0"]

const SimpleLineChart = ({ data, lines }: { data: any, lines: string[] }) => (


        <ResponsiveContainer>
            <BaseLineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {lines.map((line, index) => <Line key={index} type="monotone" dataKey={line} stroke={colours?.[index] ?? colours[0]} />)}
                <Tooltip />
            </BaseLineChart>
        </ResponsiveContainer>
);

export default SimpleLineChart