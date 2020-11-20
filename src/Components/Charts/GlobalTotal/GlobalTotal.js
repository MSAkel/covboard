import React, {useState} from 'react'
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts';
import { withStyles } from '@material-ui/core/styles';
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

const GlobalTotal = ({data}) => {
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

  return(
    <div className="chart-container global-total">
      <h2 className="chart-title">Global Cumulative Cases</h2>
      {data && 
        <ResponsiveContainer width='100%' height={400}>
          <AreaChart
          data={data}
          margin={{
              top: 15, right: 10, left: 20, bottom: 5,
          }}
          >
          <XAxis dataKey="dateShort" tick={{ angle: -15 }} dy={8} height={50} interval='preserveStartEnd'/>
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {displayConfirmed && <Area type="monotone" dataKey="confirmed" stackId="1" stroke="#6EADFF" fill="#6EADFF"/>}
          {displayRecovered && <Area type="monotone" dataKey="recovered" stackId="2" stroke="#74FFA7" fill="#74FFA7"/>}
          {displayDeaths && <Area type="monotone" dataKey="deaths" stackId="3" stroke="#FF6060" fill="#FF6060"/>}
          </AreaChart>
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

export default GlobalTotal