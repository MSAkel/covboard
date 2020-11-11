import Header from '../../Components/Header/Header';
import Content from '../../Components/Content/Content';
import Footer from '../../Components/Footer/Footer';

import './MainPage.css';

function MainPage({regions, regionsData, countriesList, gs}) {
  return (
    <>
      <Header />
      <Content 
        regions={regions} 
        regionsData={regionsData} 
        countriesList={countriesList} 
        gs={gs}
      />
      <Footer />
    </>
  );
}

export default MainPage;
