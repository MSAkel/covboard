import React from 'react'
import Header from '../../Components/Header/Header';
import Charts from '../../Components/Charts/Charts';
import Footer from '../../Components/Footer/Footer';

import './ChartsPage.css'

const ChartsPage = ({dailyData, countriesList, countriesDailyData}) => {
  return(
    <>
      <Header />
      <div className="note">
        <p>The number of actual daily cases might differ from the displayed data due to unavailable reports.</p>
      </div>
      <Charts 
        dailyData={dailyData}
        countriesList={countriesList}
        countriesDailyData={countriesDailyData}
      />
      <Footer />
    </>
  )
}

export default ChartsPage