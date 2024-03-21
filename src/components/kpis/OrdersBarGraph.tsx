import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    uv: 3490,
    pv: 2500,
    amt: 2500,
  },
  {
    name: 'Sept',
    uv: 3490,
    pv: 900,
    amt: 900,
  },
  {
    name: 'Oct',
    uv: 3490,
    pv: 400,
    amt: 400,
  },
  {
    name: 'Nov',
    uv: 3490,
    pv: 2900,
    amt: 2900,
  },
  {
    name: 'Dec',
    uv: 3490,
    pv: 2150,
    amt: 2150,
  },
];

const OrdersGraph = () => {
      return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={{fill: 'transparent'}}/>
          <Legend />
          <Bar dataKey="pv" fill="#26a0da" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

export default OrdersGraph
