import React, {useState} from "react"
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Map from "../../Components/Map/Map";
import StatTab from "../../Components/StatTab/StatTab";

import './MapPage.css'

function MapPage({countriesList}) {
  const [selection, setSelection] = useState("Confirmed")

  return (
    <>
      <Header />
      <StatTab selection={selection} setSelection={setSelection}/>
      <Map countriesList={countriesList} selectedStat={selection}/>
      {/* <Footer /> */}
    </>
  )
}
export default MapPage