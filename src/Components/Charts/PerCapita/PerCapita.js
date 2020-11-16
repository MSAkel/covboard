import React, {useEffect, useState} from 'react'
import {ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const PerCapita = ({countriesList}) => {
  const [data, setData]= useState()

  useEffect(() => {
    const calcCapita = () => {
      const list = []
      countriesList.forEach(country => {
        if(country.tests > 0 && country.confirmed > 0) {
          let perCapita = country.confirmed / country.population
          perCapita = (perCapita * 1000000).toFixed(0)

          let positivityRate = ((country.confirmed / country.tests) * 100).toFixed(1)
          // let positivityRate = (country.tests / country.confirmed) * 100
          // positivityRate = (positivityRate * 1000000).toFixed(1)

          let testsDone = country.tests / country.population
          testsDone = (testsDone * 1000000).toFixed(0)

          list.push({
            country: country.state ? country.state : country.country,
            perCapita,
            positivityRate,
            tests: testsDone
          })
        }
      });
      // console.log(list)
      setData(list)
    }

    calcCapita()
  },[countriesList])

  const CustomTooltip = ({ payload }) => {
    return (
      <div>
        <b>{payload?.[0]?.payload?.country}</b>
        <span >
          <p >
            <small>Total confirmed per million {payload?.[0]?.payload?.perCapita}</small>
          </p>
          <p>positivityRate {payload?.[0]?.payload?.positivityRate}</p>
        </span>
      </div>
    )
  }

  return(
    <div className="chart-container per-capita">
      <h2 className="chart-title">Cases per 100,000 population</h2>
      {data && 
        <ResponsiveContainer width='100%' height={400}>
          <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid />
            <XAxis dataKey={'positivityRate'} type="number" name='positivityRate'/>
            <YAxis dataKey={'perCapita'} type="number" name='Per Capita' />
            <Scatter name='Cases Per Capita' data={data} fill='#8884d8'>
              {/* <LabelList dataKey="country"/> */}
            </Scatter>
            <Tooltip content={<CustomTooltip />} />
          </ScatterChart>
        </ResponsiveContainer>
      }
    </div>
  )
}

export default PerCapita