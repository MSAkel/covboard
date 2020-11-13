import React, {useRef, useEffect, useState} from "react"
import { VectorMap } from "react-jvectormap"
// import ReactCountryFlag from "react-country-flag";

import './Map.css'

const Map = ({countriesList, selectedStat}) => {
  const inputRef = useRef('map');

  const [countries, setCountries] = useState([])
  const [cases, setCases] = useState()
  const [colourRange, setColourRange] = useState([])

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
        if(!country.state) list.push(info)
        if(!country.state) values[country.country_code.toUpperCase()] = country.confirmed
      }
      })
      setCountries(list)
      setCases(values)
    }
    
    if(countriesList.length) createData()
  }, [countriesList])

  useEffect(() => {
    if(countries.length) {
      const values = {}
      console.log(selectedStat)
      countries.forEach(country => {
        if(country[selectedStat.toLowerCase()] >= 0) {
          values[country.country_code.toUpperCase()] = country[selectedStat.toLowerCase()]
        } else {
          values[country.country_code.toUpperCase()] = 0
        }

      })
      console.log(values)
      setCases(values)
      switch(selectedStat){
        case 'Confirmed':
          setColourRange(['#80bdff', '#0c5aad'])
          break;
        case 'Recovered':
          setColourRange(['#b0ffb9', '#00ab09'])
          break;
        case 'Active':
          setColourRange(['#faff99', '#b1ba00'])
          break;
        case 'Deaths':
          setColourRange(['#FFBCB6', '#B00C22'])
          break;
      }
    }
  }, [selectedStat])

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
            scale: colourRange.length ? colourRange : ['#80bdff', '#0c5aad'],
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
          },
          hover: {
            cursor: 'pointer',
          }
        }}
        onRegionTipShow = {function(event, label, code) {
          label.html(() => displayData(label.text(), code));
        }}
      />
    </div>
  )
}

export default Map