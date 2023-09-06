import React from 'react'
import logo from '../assets/logo.png'
import '../css/Header.css'

export default function Header() {
  return (
    <header>
        <img src={logo} alt='logo site' />
        <p className='item_header' >Accueil</p>
        <p className='item_header'>Profil</p>
        <p className='item_header'>Réglage</p>
        <p className='item_header'>Communauté</p>
    </header>
  )
}
