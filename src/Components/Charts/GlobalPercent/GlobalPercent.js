import React from 'react'
import {ResponsiveContainer, Cell, Tooltip, PieChart, Pie} from 'recharts';

const COLORS = ['#74FFA7', '#FFF072', '#FF6060'];

const GlobalPercent = ({totalAll, totalConfirmed}) => {
  //Labels on pie chart
  const renderLabel = (entry) => {
    let label = `${entry.name}: ${((entry.value/totalConfirmed.value)*100).toFixed(1)}%`;
    return label;
  }

  const CustomTooltip = ({ payload }) => {
    return (
      <div className="tooltip">
        <b>{payload?.[0]?.payload?.date}</b>
        <span >
          <p >
             Total: {payload?.[0]?.payload?.value.toLocaleString()}
          </p>
        </span>
      </div>
    )
  }

  return(
    <div className="chart-container pie-chart">
      <h2 className="chart-title">Global Cumulative Percentage</h2>
      {totalAll && 
        <ResponsiveContainer width='100%' height={400}>
          <PieChart >
            <Pie dataKey="value" data={totalAll} outerRadius='55%' fill="#8884d8" label={renderLabel}>
              {
                totalAll.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
              }
            </Pie>
            <Tooltip content={<CustomTooltip />}/>
          </PieChart>
        </ResponsiveContainer>
      }
    </div>
  )
}

export default GlobalPercent