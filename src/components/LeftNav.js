import React from 'react'
import '../css/LeftNav.css'
import iconMeditation from '../assets/icon.png'
import iconNatation from '../assets/icon2.png'
import iconVelo from '../assets/icon3.png'
import iconHaltere from '../assets/icon4.png'

export default function LeftNav() {
  return (
    <div className='left_naf_container'>
        <div/>
        <div className='left_naf_container_icon'>
        <img src={iconMeditation} alt='icon de méditation' />
        <img src={iconNatation} alt='icon de natation' />
        <img src={iconVelo} alt='icon de velo' />
        <img src={iconHaltere} alt='icon haltère'  />
        </div>
        

        <p className='left_nav_copyryght' >Copiryght, SportSee 2020</p>
    </div>
  )
}
