import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    uv: 4300,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sept',
    uv: 2100,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Oct',
    uv: 2700,
    pv: 2700,
    amt: 2700,
  },
  {
    name: 'Nov',
    uv: 2100,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Dec',
    uv: 700,
    pv: 4300,
    amt: 700,
  },
];

const RevenueLineGraph = () => {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#26a0da" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

export default RevenueLineGraph
