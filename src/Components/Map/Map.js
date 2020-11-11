import React, {useRef, useEffect, useState} from "react"
import { VectorMap } from "react-jvectormap"
import ReactCountryFlag from "react-country-flag";

import './Map.css'

const Map = ({countriesList}) => {
  const inputRef = useRef('map');

  const [countries, setCountries] = useState([])
  const [cases, setCases] = useState()

  const createData = () => {
    const list = []
    const values = {}
    countriesList.forEach(country => {
      if(country.country){
      let info = {
        country_code: country.country_code,
        country: country.country,
        confirmed: country.confirmed,
        daily_confirmed: country.daily_confirmed,
        recovered: country.recovered,
        active: country.confirmed - (country.recovered + country.deaths) ,
        critical: country.critical,
        deaths: country.deaths,
        daily_deaths: country.daily_deaths
      }
      if(country.state) info = {...info, country: country.state};
      list.push(info)
      values[country.country_code.toUpperCase()] = country.confirmed
    }
    })
    // console.log(values)
    setCountries(list)
    setCases(values)
  }

  const displayData = (label, code) => {
    // console.log(label)
    const country = countries.find(country => country.country_code.toUpperCase() === code)
    if(country){
      if(code === country.country_code.toUpperCase()) {
        // const flag = <ReactCountryFlag countryCode={country.country_code.toUpperCase()} className="flag"/>
        // console.log(flag)
        const content = `
        <div>
        <h1>${country.country}</h1>
        <h3>Confirmed: ${checkData(country.confirmed)}</h3>
        <h3>Recovered: ${checkData(country.recovered)}</h3>
        <h3>Active: ${checkData(country.confirmed - (country.recovered + country.deaths))}</h3>
        <h3>Critical: ${checkData(country.critical)}</h3>
        <h3>Deaths: ${checkData(country.deaths)}</h3>
        </div>
        `
        return content
      }
    } else {
      const content = `
      <h1>${label}</h1>
      <h3>Confirmed: No Data</h3>
      <h3>Recovered: No Data</h3>
      <h3>Active: No Data</h3>
      <h3>Critical: No Data</h3>
      <h3>Deaths: No Data</h3>
      `
      return content
    }
    
  }

  const checkData = data => {
    if(data !== -1 && data !== 0){
      return data.toLocaleString()
    } else {
      return 'No Data'
    }
  }

  useEffect(() => {
    if(countriesList.length) createData()
  }, [countriesList])

  return (
    <div  className="map-page-container" style={{width: 'calc(90vw - 10px)', height: 705}}>
      <VectorMap 
        map={'world_mill'}
        backgroundColor="none"
        zoomOnScroll={true}
        ref={inputRef}
        containerStyle={{
            width: '100%',
            height: '100%'
        }}
        containerClassName="map"
        series = {{
          regions: [{
            values: cases,
            scale: ['#FFBCB6', '#B00C22'],
            normalizeFunction: 'polynomial'
          }]
        }}
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: 'pointer',
            fill: "#334C77",
          }
        }}
        regionLabelStyle={{
          initial: {
            'font-family': 'Verdana',
            'font-size': '24',
            'font-weight': 'bold',
            cursor: 'default',
            // fill: 'green'
          },
          hover: {
            cursor: 'pointer',
            // fill: 'green'
          }
        }}
        onRegionTipShow= {function(event, label, code) {
          // if (code == 'it') {
          //     event.preventDefault();
          // } else if (code == 'it') {
              label.html(() => displayData(label.text(), code));
          // }
      }}
        // onRegionOver={displayData}
      />
    </div>
  )
}

export default Map