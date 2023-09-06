import React from 'react'
import '../css/PieChartComponents.css'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Customized } from 'recharts';

export default function PieChartComponents({ score }) {
	const data = [
		{ name: 'todayScore', value: score },
		{ name: 'corrigeValue', value: 1 - score }
	];

	const customLegend = (props) => {
		const { payload } = props
		return (
			<div className='pie_chart_legend'>
				<p className='pie_chart_score_legend'>{payload[0].payload.percent * 100}%</p>
				<p className='pie_chart_text_legend'>de votre objectif</p>
			</div>

		);
	}

	const customTitle = () => {
		return (
			<g>
				<text x={30} y={24} fill='#20253A' className='pie_chart_score' >Score</text>
			</g>
		)
	}

	return (
		<div className='container_pie_chart'>
			<PieChart width={258} height={263} className='pie_chart'>
				<Pie
					dataKey="value"
					data={data}
					startAngle={90}
					endAngle={380 + 90}
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill="#8884d8"
					innerRadius={60}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={index == 0 ? "#FF0000" : "#FBFBFB"} />
					))}
				</Pie>
				<Legend verticalAlign='center' content={customLegend} />
				<Customized component={customTitle} />
			</PieChart>
		</div>
	)
}
