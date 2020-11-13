import React from 'react'
import Header from '../../Components/Header/Header';
import Charts from '../../Components/Charts/Charts';
import Footer from '../../Components/Footer/Footer';

const ChartsPage = ({dailyData, countriesList}) => {
  return(
    <>
      <Header />
      <Charts 
        dailyData={dailyData}
        countriesList={countriesList} 
      />
      <Footer />
    </>
  )
}

export default ChartsPage