import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Rectangle } from 'recharts';
import moment, { max } from "moment"
import '../css/BarChartComponents.css'
import UserService from '../services/UserService';

export default function BarChartComponents(props) {
  const { id } = props
  const [sessions, setSessions] = useState([])
  const [minKilo, setMinKilo] = useState()
  const [maxKilo, setMaxKilo] = useState()
  const [minCal, setMinCal] = useState()
  const [maxCal, setMaxCal] = useState()

  const CustomTooltip = (props) => {
    const { active, payload } = props
    if (active && payload && payload.length) {
      return (
        <div>
          <div className="custom-tooltip">
            <p className='text-tooltip'>{payload[0].value}kg</p>
            <p className='text-tooltip'>{payload[0].payload.calories}Kcal</p>
            {/* <p className="intro">{getIntroOfPage(label)}</p> */}
          </div>
        </div>

      );
    }

    return null;
  };

  const customLegend = (props) => {
    const { payload } = props;

    return (
      <div className='custom-legend'>
        <p className='title-legend'>Activité quotidienne</p>
        <ul className='container_info_legend'>
          {
            payload.map((entry, index) => (
              <li className={`color_legend_${index == 0 ? "black" : "red"}`} key={`item-${index}`}><span className='info_legend'>{entry.value}</span></li>
            ))
          }
        </ul>
      </div>

    );
  }

  function recupData() {
    UserService.getActivity(id).then((res) => {
      if (res.status == 200) {
        let minKilo;
        let maxKilo;
        let minCal;
        let maxCal;
        for (let i = 0; i < res.data.data.sessions.length; i++) {
          const element = res.data.data.sessions[i];
          if (element.kilogram < minKilo || minKilo == undefined) {
            minKilo = element.kilogram
          }
          if (element.kilogram > maxKilo || maxKilo == undefined) {
            maxKilo = element.kilogram
          }
          if (element.calories < minCal || minCal == undefined) {
            minCal = element.calories
          }
          if (element.calories > maxCal || maxCal == undefined) {
            maxCal = element.calories
          }
        }
        setMinKilo(minKilo - 1)
        setMaxKilo(maxKilo + 1)
        setMinCal(minCal - 50)
        setMaxCal(maxCal + 50)
        setSessions(res.data.data.sessions)
      }
    })
  }

  useEffect(() => {
    recupData()
  }, [])


  return (
    <div className='container_bar_chart' >
      <BarChart width={835} height={320} data={sessions} className='bar_chart'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tickFormatter={(date) => moment(date).format("D")} />
        <YAxis domain={[minKilo, maxKilo]} yAxisId="right" orientation='right' dataKey='kilogram' />
        <YAxis hide domain={[minCal, maxCal]} yAxisId="left" orientation='left' dataKey='calories' />
        <Tooltip offset={15} position={{ x: undefined, y: 90 }} content={<CustomTooltip />} />
        <Legend verticalAlign='top' content={customLegend} />
        <Bar yAxisId="right" name='Poids (kg)' legendType='circle' barSize={10} dataKey="kilogram" shape={<Rectangle radius={[20, 20, 0, 0]} />} fill="#282D30" />
        <Bar yAxisId="left" name='Calories brûlées (kCal)' legendType='circle' barSize={10} dataKey="calories" shape={<Rectangle radius={[20, 20, 0, 0]} />} fill="#E60000" />
      </BarChart>
    </div>

  )
}
