import React, {useEffect, useState} from 'react'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';

const GlobalDaily = ({data}) => {
  const [dailyData, setDailyData] = useState()

  const CustomTooltip = ({ payload }) => {
    return (
      <div className="tooltip">
        <b>{payload?.[0]?.payload?.date}</b>
        <span >
          <p >
            Confirmed: {payload?.[0]?.payload?.confirmed.toLocaleString()}
          </p>
        </span>
      </div>
    )
  }

  useEffect(() => {
    if(data) {
      let dataCopy = JSON.parse(JSON.stringify(data))
      let last = 0
      for(let day in dataCopy) {
        let current = JSON.parse(JSON.stringify(dataCopy[day].confirmed)) 
        dataCopy[day].confirmed = current - last
        last = current
      }
      setDailyData(dataCopy)
    }
  }, [data])

  return(
    <div className="chart-container global-daily">
      <h2 className="chart-title">Global cumulative confirmed cases</h2>
      {dailyData && 
        <ResponsiveContainer width='100%' height={400}>
          <LineChart
              data={dailyData}
              margin={{
                  top: 15, right: 10, left: 20, bottom: 5,
              }}
          >
          <XAxis dataKey="date" tick={{ angle: -15 }} dy={8} height={50} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="confirmed" dot={{ stroke: 'none', fill: '#5078AA', r: 2 }}/>
          </LineChart>
        </ResponsiveContainer>
      }
    </div>
  )
}

export default GlobalDaily