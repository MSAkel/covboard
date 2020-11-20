import {useState} from 'react'
import GlobalStats from '../GlobalStats/GlobalStats';
import Capsule from '../Capsule/Capsule';
import DataTable from '../Table/DataTable';
import StatContainer from '../StatContainer/StatContainer';
import './Content.css';

function Content({regions, regionsData, countriesList, gs}) {
  const [selection, setSelection] = useState("World")
  const [stats, setStats] = useState(gs)

  const onSelectRegion = name => {
    setSelection(name)
  }

  const regionsCapsules = regions && regions.map((region =>
    <Capsule 
     key={region} 
     styling={selection === region ? "capsule-container active" : 'capsule-container'}
     selection={region} 
     onSelection={onSelectRegion}
    />
  ))

  const regionStats = countries => {
    if (selection === 'World') {
      setStats(gs)
      return
    }

    let confirmed = 0;
    let recovered = 0;
    let active = 0;
    let critical = 0;
    let deaths = 0;

    countries.forEach(country => {
      if(country.confirmed > 0) confirmed += country.confirmed
      if(country.recovered > 0) recovered += country.recovered
      if(country.critical > 0) critical += country.critical
      if(country.deaths > 0) deaths += country.deaths
    })

    active = confirmed - (recovered + deaths) 

    let stats = {
      confirmed: confirmed -1,
      recovered: recovered -1,
      active: active -1,
      critical: critical -1,
      deaths: deaths -1
    }
    setStats(stats)
  }

  return (
    <div className="wrapper">
        <GlobalStats gs={gs}/>
        <div className="region-container">
          <div className="capsules-list">
            {regionsCapsules}
          </div>
          <div className="active-selection-section">
            <div className="selection">
              <h1>{selection}</h1>
            </div>
            <div className="cards">
              <StatContainer title="Confirmed Cases" total={stats && stats.confirmed > 0 ? stats.confirmed.toLocaleString() : "No data"}/>
              <StatContainer title="Recovered" total={stats && stats.recovered > 0 ? stats.recovered.toLocaleString() : "No data"}/>
              <StatContainer title="Active Cases" total={stats && (stats.confirmed - (stats.recovered + stats.deaths)) > 0 ? (stats.confirmed - (stats.recovered + stats.deaths)).toLocaleString() : "No data"}/>
              <StatContainer title="Critical" total={stats && stats.critical > 0 ? stats.critical.toLocaleString() : "No data"}/>
              <StatContainer title="Deaths" total={stats && stats.deaths > 0 ? stats.deaths.toLocaleString() : "No data"}/>
            </div>
          </div>       
          <DataTable countries={countriesList} regionsData={regionsData} selection={selection} regionStats={regionStats}/>
        </div>
    </div>
  );
}

export default Content;
