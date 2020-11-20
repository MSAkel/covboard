import React from 'react'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CountriesDaily = ({countriesDailyConfirmed, countries}) => {

  // const CustomTooltip = ({ payload }) => {
  //   return (
  //     <div className="tooltip">
  //       <b>{payload?.[0]?.payload?.ay}</b>
  //       <span>
  //       </span>
  //     </div>
  //   )
  // }

  const countriesList = countries && countries.map(country => 
    <FormControlLabel
    value="deaths"
    control={<Checkbox checked={country.active} onChange={() => country.active = !country.active}/>}
    label={country.name}
  />
  )

  return(
    <div className="chart-container country-daily">
      <h2 className="chart-title">Global daily cases</h2>
      <div>
        {countriesList}
      </div>
      {countriesDailyConfirmed && 
        <ResponsiveContainer width='100%' height={400}>
          <LineChart
            data={countriesDailyConfirmed}
            margin={{
                top: 15, right: 10, left: 20, bottom: 5,
            }}
          >
          <XAxis dataKey="day" tick={{ angle: -15 }} dy={8} height={50} interval='preserveStartEnd'/>
          <YAxis />
          <Tooltip />
            {countries && countries.map(el => 
              el.active && <Line 
                type="monotone"  
                key={`line_${el.name}`}  
                dataKey={el.name} 
                stroke="#5078AA" 
                dot={{ stroke: 'none', fill: '#5078AA', r: 1.5 }}
              />  
            )}
          </LineChart>
        </ResponsiveContainer>
      }
    </div>
  )
}

export default CountriesDaily