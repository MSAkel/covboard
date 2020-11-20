import {useEffect, useState} from 'react'
import './Charts.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import GlobalTotal from './GlobalTotal/GlobalTotal'
import GlobalPercent from './GlobalPercent/GlobalPercent'
import GlobalDaily from './GlobalDaily/GlobalDaily'
import CountriesDaily from './CountriesDaily/CountriesDaily';
// import PerCapita from './PerCapita/PerCapita'

const Charts = ({dailyData, countriesDailyData}) => {
  const [data, setData] = useState()
  const [totalConfirmed, setTotalConfirmed] = useState()
  const [totalAll, setTotalAll] = useState()

  const [countriesList, setCountriesList] = useState()
  const [countriesDailyConfirmed, setCountriesDailyConfirmed] = useState()

  useEffect(() => {
    if(dailyData) {
      const totalDailyCases = []
      const totalDailyRecovered = []
      const totalDailyActive = []
      const totalDailyDeaths = []
      const world = dailyData.world

      const list = []

      let totalCases = 0
      let totalRecovered = 0
      let totalActive = 0
      let totalDeaths = 0
      let year = ''

      for(let date in world) {
        const active = world[date].confirmed - (world[date].recovered + world[date].deaths)
        totalDailyCases.push(world[date].confirmed)
        totalDailyRecovered.push(world[date].recovered)
        totalDailyActive.push(active)
        totalDailyDeaths.push(world[date].deaths)
        world[date].date = date
        list.push(world[date])

        totalCases = world[date].confirmed
        totalRecovered = world[date].recovered
        totalDeaths = world[date].deaths

         //Date
         let newDate = new Date(world[date].date);
         let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][newDate.getMonth()];
         if(parseInt(year) !== parseInt(newDate.getFullYear())){
          world[date].dateShort = `${month} ${newDate.getDate()}, ${newDate.getFullYear()}`
         } else {
          world[date].dateShort = `${month} ${newDate.getDate()}`
         }
         year = newDate.getFullYear()
      }
      totalActive = totalCases - (totalRecovered + totalDeaths)

      setTotalConfirmed({name: 'Confirmed', value: totalCases})

      setTotalAll([
        {name: 'Recovered', value: totalRecovered},
        {name: 'Active', value: totalActive},
        {name: 'Deceased', value: totalDeaths}
      ])
      
      list[list.length - 1].dateShort = list[list.length - 1].dateShort + ` ${year}`
      setData(list)
    }
  }, [dailyData])

  const removeStates = () => {
    let CanadianProvinces = []
    for(let country in countriesDailyData) {
      if(country.includes("unitedstates")) {
        if(country === 'unitedstates' || country === 'unitedstatesvirginislands') continue
        delete countriesDailyData[country]
      }
      if(country.includes("unitedkingdom")) {
        if(country === 'unitedkingdom') continue
        delete countriesDailyData[country]
      }
      if(country.includes("australia")) {
        if(country === 'australia') continue
        delete countriesDailyData[country]
      }
      if(country.includes("china")) {
        if(country === 'china') continue
        delete countriesDailyData[country]
      }
      if(country.includes("france")) {
        if(country === 'france' || country === 'francefrenchpolynesia') continue
        delete countriesDailyData[country]
      }
      if(country.includes("netherlands")) {
        if(country === 'netherlands') continue
        delete countriesDailyData[country]
      }
      if(country.includes("canada")) {
        if(country !== "canadadiamondprincess" && country !== "canadagrandprincess") {
          CanadianProvinces.push(countriesDailyData[country])
          delete countriesDailyData[country]
        } else {
          delete countriesDailyData[country]
        }
      }
    }
    countriesDailyData.canada = mergeCanadianProvinces(CanadianProvinces)

    let countries = []
    let countriesDailyConfirmed = []

    for(let country in countriesDailyData){
      if(country === 'world') continue
      if(country === 'canada' || country === 'france' || country === 'unitedkingdom'){
        countries.push({name: country, active: true})
      } else {
        countries.push({name: country, active: false})

      }

      let countryDay = countriesDailyData[country]
      for(let day in countryDay) {
        if(!countriesDailyConfirmed.some(date => date.day === day)) {
          let obj = {
            day: day,
            [country]: countryDay[day].confirmed
          }
          countriesDailyConfirmed.push(obj)
        }  else {
          let index = countriesDailyConfirmed.findIndex(date => date.day === day);
          countriesDailyConfirmed[index][country] = countryDay[day].confirmed
        }
      }
    }
    countriesDailyConfirmed.sort((a,b) => (a.day > b.day) ? 1 : ((b.day > a.day) ? -1 : 0));
    setCountriesDailyConfirmed(countriesDailyConfirmed)

    setCountriesList(countries)
  }

  const mergeCanadianProvinces = CanadianProvinces => {
    let canada = CanadianProvinces[0]
    CanadianProvinces.splice(0, 1) 
    CanadianProvinces.forEach(prov => {
      for(let day in prov) {
        if(canada[day]){         
          if(canada[day].confirmed)  canada[day].confirmed += prov[day].confirmed >= 0 ? prov[day].confirmed : 0
          if(!canada[day].confirmed) canada[day].confirmed = prov[day].confirmed >= 0 ? prov[day].confirmed : 0
          if(canada[day].deaths) canada[day].deaths += prov[day].deaths >= 0 ? prov[day].deaths : 0
          if(!canada[day].deaths) canada[day].deaths = prov[day].deaths >= 0 ? prov[day].deaths : 0
          
        }
      }
    });
    return(canada)
  }

  useEffect(() => {
    if(countriesDailyData) removeStates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesDailyData])

  return(
    <div className="charts-container">
      {!data ?
       ( 
        <div className="spinner-container">
          <CircularProgress color="secondary" /> 
        </div>
       )
       : (
      <>
        <GlobalTotal data={data}/>
        <GlobalPercent totalAll={totalAll} totalConfirmed={totalConfirmed}/>
        <GlobalDaily data={data} />
        {/* <CountriesDaily countriesDailyConfirmed={countriesDailyConfirmed} countries={countriesList}/> */}
      </>
      )
    }
    </div>
  )

}

export default Charts