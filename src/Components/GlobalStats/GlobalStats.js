import {useState, useEffect} from 'react'

import StatContainer from '../StatContainer/StatContainer';
import './GlobalStats.css';

function GlobalStats({gs}) {
  // const [gs, setGs] = useState()

  // const getStats = async() => {
  //   const URL = "https://cov19.cc/report.json"
  //   const data = await fetch(URL)
  //     .then(res => {
  //       if(!res.ok) throw new Error("Woops")
  //       return res.json()
  //     })
  //     // console.log(data.regions.world.totals)
  //     setGs(data.regions.world.totals)
  // }

  useEffect(() => {
    // getStats()
  }, [gs])

  return (
    <div className="global-stats-container">
    <h1>Global Stats</h1>
    <div className="global-stats-cards">
      <StatContainer title="Confirmed cases" total={gs ? gs.confirmed.toLocaleString() : "No data"}/>
      <StatContainer title="Recovered" total={gs ? gs.recovered.toLocaleString() : "No data"}/>
      <StatContainer title="Active Cases" total={gs ? (gs.confirmed - (gs.recovered + gs.deaths)).toLocaleString() : "No data"}/>
      <StatContainer title="Critical" total={gs ? gs.critical.toLocaleString() : "No data"}/>
      <StatContainer title="Deaths" total={gs ? gs.deaths.toLocaleString() : "No data"}/>
    </div>
    </div>
  );
}

export default GlobalStats;
