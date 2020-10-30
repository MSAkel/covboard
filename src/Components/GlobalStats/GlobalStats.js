import {useState, useEffect} from 'react'

import StatContainer from '../StatContainer/StatContainer';
import './GlobalStats.css';

function GlobalStats() {
  const [gs, setGs] = useState()

  const getStats = async() => {
    const URL = "https://cov19.cc/report.json"
    const data = await fetch(URL)
      .then(res => {
        if(!res.ok) throw new Error("Woops")
        return res.json()
      })
      console.log(data.regions.world.totals)
      setGs(data.regions.world.totals)
  }

  useEffect(() => {
    getStats()
  }, [])

  return (
    <div className="global-stats-container">
      <StatContainer title="Confirmed cases" total={gs ? gs.confirmed : "No data"}/>
      <StatContainer title="Recovered" total={gs ? gs.recovered : "No data"}/>
      <StatContainer title="Active Cases" total={gs ? gs.confirmed - (gs.recovered + gs.deaths) : "No data"}/>
      <StatContainer title="Critical" total={gs ? gs.critical : "No data"}/>
      <StatContainer title="Deaths" total={gs ? gs.deaths : "No data"}/>
    </div>
  );
}

export default GlobalStats;
