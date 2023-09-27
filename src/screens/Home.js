import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/Home.css'
import BarChartComponents from '../components/BarChartComponents'
import LineChartComponents from '../components/LineChartComponents'
import RadarChartComponents from '../components/RadarChartComponents'
import PieChartComponents from '../components/PieChartComponents'
import InfoComponents from '../components/InfoComponents'
import UserService from '../services/UserService'

export default function Home() {

  const { id } = useParams()

  const [mainData, setMainData] = useState()

  function recupData() {
    UserService.getMainData(id).then((res) => {
      setMainData(res.user)
    })
  }

  useEffect(() => {
    recupData()
  }, [])


  return (
    mainData &&
    <div className='container_home'>
      <p className='home_title'>Bonjour <span className='home_name'>{mainData?.firstName}</span></p>
      <p className='home_congratule'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className='home_container_all_info'>
        <div className='home_container_all_charts'>
          <BarChartComponents id={id} />
          <div className='home_container_specific_charts'>
            <LineChartComponents id={id} />
            <RadarChartComponents id={id} />
            <PieChartComponents score={mainData?.todayScore} />
          </div>
        </div>
        <div className='home_container_specific_info'>
          {mainData?.calorieCount &&
            <InfoComponents values={mainData.calorieCount} type={"cal"} />
          }
          {mainData?.proteinCount &&
            <InfoComponents values={mainData.proteinCount} type={"prot"} />
          }
          {mainData?.carbohydrateCount &&
            <InfoComponents values={mainData.carbohydrateCount} type={"glu"} />
          }
          {mainData?.lipidCount &&
            <InfoComponents values={mainData.lipidCount} type={"lip"} />
          }
        </div>
      </div>
    </div>
  )
}
