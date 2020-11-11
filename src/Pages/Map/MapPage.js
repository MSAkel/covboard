import React from "react"
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Map from "../../Components/Map/Map";

import './MapPage.css'

function MapPage({countriesList}) {
  return (
    <>
      <Header />
      <Map countriesList={countriesList} />
      <Footer />
    </>
  )
}
export default MapPage