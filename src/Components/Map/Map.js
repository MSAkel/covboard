import React, {useEffect, useState} from "react"
import { VectorMap } from "react-jvectormap"
// import ReactCountryFlag from "react-country-flag";

import './Map.css'

const Map = ({countriesList, selectedStat}) => {
  // const inputRef = useRef(null);
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

  
  const setBarsValues = () => {
    if(countries.length) {
      const values = {}
      const valuesArr = []
      // console.log(countries)
      countries.forEach(country => {
        if(country[selectedStat.toLowerCase()] >= 0) {
          values[country.country_code.toUpperCase()] = country[selectedStat.toLowerCase()]
        } else {
          values[country.country_code.toUpperCase()] = 0
        }
        valuesArr.push(country[selectedStat.toLowerCase()])
      })
      setCases(values)
      switch(selectedStat){
        case 'Confirmed':
          setColourRange(['#ffffcc','#c7e9b4','#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'])
          break;
        case 'Recovered':
          setColourRange(['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#31a354', '#006837'])
          break;
        case 'Active':
          setColourRange(['#edf8fb', '#bfd3e6', '#9ebcda', '#8c96c6', '#8856a7', '#810f7c'])
          break;
        case 'Deaths':
          setColourRange(['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#f03b20', '#bd0026'])
          break;
        default:
          setColourRange(['#ffffcc','#c7e9b4','#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'])
      }    
      // setRangeValues(colourRange, Math.max(...valuesArr), valuesArr)
    }
  }

  /**
   * Set the range of each colour bar
   * @param {string} selection the selected stat to display 
   * @param {*} maxValue The highest value of the selected stat, based off the countries list
   */
  // const setRangeValues = (colourRange, maxValue, valuesArr) => {
  //   console.log(maxValue)
  //   // setColours(colourRange)
  //   // valueRange = []
  //   let sum = valuesArr.reduce((a, b) => a + b, 0)
  //   let mean = sum/valuesArr.length
  //   // console.log(mean.toFixed())
  //   const differenceArr = []
  //   for(let value of valuesArr) {
  //     let difference = value - mean
  //     let differencePow = Math.pow(difference, 2)
  //     differenceArr.push(differencePow)
  //   }
  //   // console.log(differenceArr)
  //   let differenceSum = differenceArr.reduce((a, b) => a + b, 0)
  //   let variance = (differenceSum/valuesArr.length).toFixed()
  //   console.log(variance)
  //   let standardDeviation = Math.sqrt(variance)
  //   console.log(standardDeviation.toFixed())
  // }

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
      // setCases(values)
      // setBarsValues()
    }
    
    if(countriesList.length) createData()

  }, [countriesList])

  useEffect(() => {
    setBarsValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStat, countries])
// .length ? colourRange :['#C8EEFF', '#0071A4']
  return (
    <div  className="map-page-container map-size" style={{width: 'calc(90vw - 10px)', height: 'calc(75vh - 5px)'}}>
      <VectorMap 
        map={'world_mill'}
        // zoomButtons={false}
        backgroundColor="none"
        zoomOnScroll={true}
        // ref={inputRef}
        containerStyle={{
            width: '100%',
            height: '100%'
        }}
        containerClassName="map"
        series = {{
          regions: [{
            values: cases,
            scale: colourRange,
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