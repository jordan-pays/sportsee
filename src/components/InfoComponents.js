import React from 'react'
import '../css/InfoComponents.css'
import iconCalories from "../assets/calories-icon.png"
import iconProteines from '../assets/protein-icon.png'
import iconGlucides from '../assets/carbs-icon.png'
import iconLipides from '../assets/fat-icon.png'

function InfoComponents(props) {
	const { type, values } = props

	function displayIcons() {
		if (type == "cal") {
			return <img src={iconCalories} className='icon_info' />
		} else if (type == "prot") {
			return <img src={iconProteines} className='icon_info' />
		} else if (type == "glu") {
			return <img src={iconGlucides} className='icon_info' />
		} else if (type == 'lip') {
			return <img src={iconLipides} className='icon_info' />
		}
	}

	function displayUnit() {
		if (type == "cal") {
			return "kCal"
		} else {
			return "g"
		}
	}

	function diplayInfo() {
		if (type == "cal") {
			return "Calories"
		} else if (type == "prot") {
			return "Proteines"
		} else if (type == "glu") {
			return "Glucides"
		} else if (type == 'lip') {
			return "Lipides"
		}
	}

	return (
		<div className='container_info_comp'>
			{displayIcons()}
			<div>
				<p className='value_info_comp'>{values} {displayUnit()}</p>
				<p className='label_info_comp'> {diplayInfo()}</p>
			</div>
		</div>
	)
}

export default InfoComponents