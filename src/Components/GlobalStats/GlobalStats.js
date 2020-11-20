import StatContainer from '../StatContainer/StatContainer';
import './GlobalStats.css';

function GlobalStats({gs}) {
  return (
    <div className="global-stats-container">
    <h1>Global Stats</h1>
    <div className="global-stats-cards">
      <StatContainer title="Confirmed Cases" total={gs ? gs.confirmed.toLocaleString() : "No data"}/>
      <StatContainer title="Recovered" total={gs ? gs.recovered.toLocaleString() : "No data"}/>
      <StatContainer title="Active Cases" total={gs ? (gs.confirmed - (gs.recovered + gs.deaths)).toLocaleString() : "No data"}/>
      <StatContainer title="Critical" total={gs ? gs.critical.toLocaleString() : "No data"}/>
      <StatContainer title="Deaths" total={gs ? gs.deaths.toLocaleString() : "No data"}/>
    </div>
    </div>
  );
}

export default GlobalStats;
