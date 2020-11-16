import React from 'react'
import {ResponsiveContainer, Cell, Tooltip, PieChart, Pie} from 'recharts';

const COLORS = ['#74FFA7', '#FFF072', '#FF6060'];

const GlobalPercent = ({totalAll, totalConfirmed}) => {
  //Labels on pie chart
  const renderLabel = (entry) => {
    let label = `${entry.name}: ${((entry.value/totalConfirmed.value)*100).toFixed(1)}%`;
    return label;
  }

  return(
    <div className="chart-container pie-chart">
      <h2 className="chart-title">Global Percentage</h2>
      {totalAll && 
        <ResponsiveContainer width='100%' height={400}>
          <PieChart 
            // width={800} 
            // height={400}
          >
            <Pie data={totalAll} outerRadius={100} fill="#8884d8" label={renderLabel}>
              {
                totalAll.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
              }
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      }
    </div>
  )
}

export default GlobalPercent