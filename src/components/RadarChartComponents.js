import React, { useEffect, useState } from 'react'
import '../css/RadarChartComponents.css'
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts'
import UserService from '../services/UserService'

export default function RadarChartComponents(props) {
	const { id } = props
	const [kind, setKind] = useState()
	const [data, setData] = useState([])
	const customPolarAxis = (props) => {
		const { x, y, payload } = props
		return (
			<g>
				<text x={x} y={y} dx={Math.abs(payload.coordinate) <= 90 ? -15 : -30} dy={payload.coordinate == -90 ? 5 : payload.coordinate == -30 ? 10 : -5} fill='#FFF' className='radar_chart_kinds'>
					{kind[payload.value]}
				</text>
			</g>
		)
	}

	function recupData() {
		UserService.getPerformance(id).then((res)=>{
			if(res.status == 200){
				setKind(res.data.data.kind)
				setData(res.data.data.data)
			}
		})
	}

	useEffect(() => {
		recupData()
	}, [])


	return (
		<div className='container_radar_chart' >
			<RadarChart width={258} height={263} className='radar_chart' cx="50%" cy="50%" outerRadius="80%" data={data}>
				<PolarGrid />
				<PolarAngleAxis dataKey="kind" tick={customPolarAxis} />
				<Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
			</RadarChart>
		</div>
	)
}
