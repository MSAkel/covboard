import {useState} from 'react'
import GlobalStats from '../GlobalStats/GlobalStats';
import Capsule from '../Capsule/Capsule';
import DataTable from '../Table/DataTable';
import StatContainer from '../StatContainer/StatContainer';
import './Content.css';

function Content({regions, regionsData, countriesList, gs}) {
  const [selection, setSelection] = useState("World")

  const onSelectRegion = name => {
    setSelection(name)
  }

  const regionsCapsules = regions && regions.map((region =>
    <Capsule 
     key={region} 
     styling={selection === region ? "capsule-container active" : 'capsule-container'}
     region={region} 
     onSelectRegion={onSelectRegion}
    />
  ))

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
              <StatContainer title="Confirmed cases" total={gs ? gs.confirmed.toLocaleString() : "No data"}/>
              <StatContainer title="Recovered" total={gs ? gs.recovered.toLocaleString() : "No data"}/>
              <StatContainer title="Active Cases" total={gs ? (gs.confirmed - (gs.recovered + gs.deaths)).toLocaleString() : "No data"}/>
              <StatContainer title="Critical" total={gs ? gs.critical.toLocaleString() : "No data"}/>
              <StatContainer title="Deaths" total={gs ? gs.deaths.toLocaleString() : "No data"}/>
            </div>
          </div>       
          <DataTable countries={countriesList} regionsData={regionsData} selection={selection}/>
        </div>
    </div>
  );
}

export default Content;
