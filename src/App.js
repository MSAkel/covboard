import {useEffect, useState} from 'react'
import MainPage from './Pages/MainPage/MainPage';
import MapPage from './Pages/Map/MapPage';
import ChartsPage from './Pages/Charts/ChartsPage';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css';

function App() {
  const [regions, setRegions] = useState([])
  const [regionsData, setRegionsData] = useState([])
  const [countriesList, setCountriesList] = useState([])
  // Global stats
  const [gs, setGs] = useState()

  const getStats = async() => {
    const URL = "https://cov19.cc/report.json"
    const data = await fetch(URL)
    .then(res => {
      if(!res.ok) throw new Error("Woops")
      return res.json()
    })

    let regionsList = []
    for(let region in data.regions) {
      if(data.regions[region].name && data.regions[region].name !== 'Antarctica') regionsList.push(data.regions[region].name)
    }
    regionsList.sort()
    
    setRegions(regionsList)
    setRegionsData(data.regions)
    setGs(data.regions.world.totals)
    setCountriesList(data.regions.world.list)
  }

  useEffect(() => {
    if(!countriesList.length) getStats()
  }, [])


  return (
    <Router>
      <Switch>
        <Route exact path="/covcharts">
          <MainPage 
            regions={regions} 
            regionsData={regionsData} 
            countriesList={countriesList} 
            gs={gs}
          />
        </Route>
        <Route path="/map">
          <MapPage 
            countriesList={countriesList} 
          />
        </Route>
        <Route path="/charts">
          <ChartsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;