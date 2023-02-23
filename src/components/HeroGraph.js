import { Tooltip, useTheme } from "@material-ui/core";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: 'A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'C',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'E',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const HeroGraph = () => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid opacity={0.25} strokeDasharray="3 3" />
          <Line type="monotone" dataKey="pv" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} strokeWidth={2} />
          <Line type="monotone" dataKey="uv" stroke="#fd2155" fill="#fd2155" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
  );
};

export default HeroGraph;
