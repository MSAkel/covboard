import React, {useState} from "react"
import ColourRangeBar from "../../Components/ColourRangeBar/ColourRangeBar";
import Header from '../../Components/Header/Header';
// import Footer from '../../Components/Footer/Footer';
import Map from "../../Components/Map/Map";
import StatTab from "../../Components/StatTab/StatTab";

import './MapPage.css'

function MapPage({countriesList}) {
  const [selection, setSelection] = useState("Confirmed")
  const [range, setRange] = useState()
  const [colours, setColours] = useState()

  return (
    <>
      <Header />
      <StatTab 
        selection={selection} 
        setSelection={setSelection}
      />
      <Map 
        countriesList={countriesList} 
        selectedStat={selection}
        setRange={setRange}
        setColours={setColours}
      />
      {/* <ColourRangeBar 
        range={range} 
        colours={colours}
      /> */}
      {/* <Footer /> */}
    </>
  )
}
export default MapPage