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
      if (res.status == 200) {
        setMainData(res.data.data)
      }else{
        window.location.href = "/error"
      }
    }).catch(()=>{
      window.location.href = "/error"
    })
  }

  useEffect(() => {
    recupData()
  }, [])


  return (
    mainData &&
    <div className='container_home'>
      <p className='home_title'>Bonjour <span className='home_name'>{mainData?.userInfos.firstName}</span></p>
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
          {mainData?.keyData?.calorieCount &&
            <InfoComponents values={mainData.keyData.calorieCount} type={"cal"} />
          }
          {mainData?.keyData?.proteinCount &&
            <InfoComponents values={mainData.keyData.proteinCount} type={"prot"} />
          }
          {mainData?.keyData?.carbohydrateCount &&
            <InfoComponents values={mainData.keyData.carbohydrateCount} type={"glu"} />
          }
          {mainData?.keyData?.lipidCount &&
            <InfoComponents values={mainData.keyData.lipidCount} type={"lip"} />
          }
        </div>
      </div>
    </div>
  )
}
