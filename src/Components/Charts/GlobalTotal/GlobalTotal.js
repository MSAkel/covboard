import React from 'react'
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend} from 'recharts';

const GlobalTotal = ({data}) => {
  return(
    <div className="chart-container global-total">
      <h2 className="chart-title">Global Total</h2>
      {data && 
        <ResponsiveContainer width='100%' height={400}>
          <AreaChart
          // width={800}
          // height={400}
          data={data}
          margin={{
              top: 15, right: 10, left: 20, bottom: 5,
          }}
          >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="date" tick={{ angle: -15 }} dy={8} height={50} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="confirmed" stackId="1" stroke="#6EADFF" fill="#6EADFF"/>
          <Area type="monotone" dataKey="recovered" stackId="2" stroke="#74FFA7" fill="#74FFA7"/>
          <Area type="monotone" dataKey="deaths" stackId="3" stroke="#FF6060" fill="#FF6060"/>
          </AreaChart>
        </ResponsiveContainer>
      }
    </div>
  )
}

export default GlobalTotal