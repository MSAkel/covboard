import {useEffect, useState} from 'react'
import './Charts.css'
import GlobalTotal from './GlobalTotal/GlobalTotal'
import GlobalPercent from './GlobalPercent/GlobalPercent'
import PerCapita from './PerCapita/PerCapita'

const Charts = ({dailyData, countriesList}) => {
  const [data, setData] = useState()
  const [totalConfirmed, setTotalConfirmed] = useState()
  const [totalRecovered, setTotalRecovered] = useState()
  const [totalActive, setTotalActive] = useState()
  const [totalDeaths, setTotalDeaths] = useState()

  const [totalAll, setTotalAll] = useState()

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

      for(let date in world) {
        const active = world[date].confirmed - (world[date].recovered + world[date].deaths)
        totalDailyCases.push(world[date].confirmed)
        totalDailyRecovered.push(world[date].recovered)
        totalDailyActive.push(active)
        totalDailyDeaths.push(world[date].deaths)
        world[date].date = date
        list.push(world[date])

        totalCases += world[date].confirmed
        totalRecovered += world[date].recovered
        totalDeaths += world[date].deaths
      }
      totalActive = totalCases - (totalRecovered + totalDeaths)

      setTotalConfirmed({name: 'Confirmed', value: totalCases})
      setTotalRecovered({name: 'Recovered', value: totalRecovered})
      setTotalActive({name: 'Active', value: totalActive})
      setTotalDeaths({name: 'Deceased', value: totalDeaths})

      setTotalAll([
        {name: 'Recovered', value: totalRecovered},
        {name: 'Active', value: totalActive},
        {name: 'Deceased', value: totalDeaths}
      ])
      setData(list)
    }
  }, [dailyData])

  return(
    <div className="charts-container">
      <GlobalTotal data={data}/>
      <GlobalPercent totalAll={totalAll} totalConfirmed={totalConfirmed}/>
      {/* <PerCapita countriesList={countriesList}/> */}
    </div>
  )

}

export default Charts