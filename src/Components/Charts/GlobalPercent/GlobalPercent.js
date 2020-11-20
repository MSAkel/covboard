import React from 'react'
import {ResponsiveContainer, Cell, Tooltip, PieChart, Pie} from 'recharts';

const COLORS = ['#74FFA7', '#FFF072', '#FF6060'];

const GlobalPercent = ({totalAll, totalConfirmed}) => {
  //Labels on pie chart
  // const renderLabel = (entry) => {
  //   let label = `${entry.name}: ${((entry.value/totalConfirmed.value)*100).toFixed(1)}%`;
  //   return label;
  // }
  const RADIAN = Math.PI / 180;  
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
   const x  = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  
   return (
     <text x={x} y={y} fill="#222" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
       {`${(percent * 100).toFixed(1)}%`}
     </text>
   );
 };

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
        <ResponsiveContainer width='100%' height={window.innerWidth > 420 ? 400 : 200}>
          <PieChart >
            <Pie 
              dataKey="value" 
              data={totalAll} 
              outerRadius='65%' 
              stroke="none"
              fill="#8884d8"
              labelLine={false}
              label={renderLabel}
            >
              {
                totalAll.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
              }
            </Pie>
            <Tooltip content={<CustomTooltip />}/>
          </PieChart>
        </ResponsiveContainer>
      }
      <div className="pie-legend">
        <div>
          <div className="box-colour-code" style={{backgroundColor:'#74FFA7'}}></div>
          <p>Recovered</p>
        </div>
        <div>
          <div className="box-colour-code" style={{backgroundColor:'#FFF072'}}></div>
          <p>Active</p>
        </div>
        <div>
          <div className="box-colour-code" style={{backgroundColor:'#FF6060'}}></div>
          <p>Deceased</p>
        </div>
      </div>
    </div>
  )
}

export default GlobalPercent