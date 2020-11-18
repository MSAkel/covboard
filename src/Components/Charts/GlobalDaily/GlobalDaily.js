import React, {useEffect, useState} from 'react'
import { withStyles } from '@material-ui/core/styles';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ConfirmedCheckbox = withStyles({
  root: {
    color: '#5078AA',
    '&$checked': {
      color: '#5078AA',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RecoveredCheckbox = withStyles({
  root: {
    color: '#74FFA7',
    '&$checked': {
      color: '#74FFA7',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


const DeathsCheckBox = withStyles({
  root: {
    color: '#FF6060',
    '&$checked': {
      color: '#FF6060',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const GlobalDaily = ({data}) => {
  const [dailyData, setDailyData] = useState()
  const [displayConfirmed, setDisplayConfirmed] = useState(true)
  const [displayRecovered, setDisplayRecovered] = useState(true)
  const [displayDeaths, setDisplayDeaths] = useState(true)

  const CustomTooltip = ({ payload }) => {
    return (
      <div className="tooltip">
        <b>{payload?.[0]?.payload?.date}</b>
        <span>
          {displayConfirmed && <p>Confirmed: {payload?.[0]?.payload?.confirmed.toLocaleString()}</p>}
          {displayRecovered && <p>Recovered: {payload?.[0]?.payload?.recovered.toLocaleString()}</p>}
          {displayDeaths && <p>Deaths: {payload?.[0]?.payload?.deaths.toLocaleString()}</p>}
        </span>
      </div>
    )
  }

  useEffect(() => {
    if(data) {
      let dataCopy = JSON.parse(JSON.stringify(data))
      let lastConfirmed = 0
      let lastRecovered = 0
      let lastDeaths = 0
      for(let day in dataCopy) {
        //Confirmed
        let currentConfirmed = JSON.parse(JSON.stringify(dataCopy[day].confirmed)) 
        dataCopy[day].confirmed = currentConfirmed - lastConfirmed
        lastConfirmed = currentConfirmed

        //Recovered
        let currentRecovered = JSON.parse(JSON.stringify(dataCopy[day].recovered)) 
        dataCopy[day].recovered = currentRecovered - lastRecovered
        lastRecovered = currentRecovered

        //Deaths
        let currentDeaths = JSON.parse(JSON.stringify(dataCopy[day].deaths)) 
        dataCopy[day].deaths = currentDeaths - lastDeaths
        lastDeaths = currentDeaths
      }
      setDailyData(dataCopy)
    }
  }, [data])

  return(
    <div className="chart-container global-daily">
      <h2 className="chart-title">Global daily cases</h2>
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
          {displayConfirmed && <Line type="monotone" dataKey="confirmed" stroke="#5078AA" dot={{ stroke: 'none', fill: '#5078AA', r: 1.5 }}/>}
          {displayRecovered && <Line type="monotone" dataKey="recovered" stroke="#74FFA7" dot={{ stroke: 'none', fill: '#74FFA7', r: 1.5 }}/>}
          {displayDeaths && <Line type="monotone" dataKey="deaths" stroke="#FF6060" dot={{ stroke: 'none', fill: '#FF6060', r: 1.5 }}/>}
          </LineChart>
        </ResponsiveContainer>
      }
      <div className="checkbox-container">
        <FormControlLabel
          value="confirmed"
          control={<ConfirmedCheckbox checked={displayConfirmed} onChange={() => setDisplayConfirmed(!displayConfirmed)}/>}
          label="Confirmed"
        />
         <FormControlLabel
          value="recovered"
          control={<RecoveredCheckbox checked={displayRecovered} onChange={() => setDisplayRecovered(!displayRecovered)}/>}
          label="Recovered"
        />
         <FormControlLabel
          value="deaths"
          control={<DeathsCheckBox checked={displayDeaths} onChange={() => setDisplayDeaths(!displayDeaths)}/>}
          label="Deaths"
        />
      </div>
    </div>
  )
}

export default GlobalDaily