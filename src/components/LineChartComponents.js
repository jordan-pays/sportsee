import React, { useEffect, useRef, useState } from 'react'
import '../css/LineChartComponents.css'
import { Legend, Line, LineChart, Tooltip, XAxis } from 'recharts'
import UserService from '../services/UserService'


export default function LineChartComponents(props) {

  const ref = useRef(null);
  const { id } = props
  const [sessions, setSessions] = useState([])

  const customLegend = () => {
    return (
      <div className='line_chart_legend'>
        <p className='line_chart_title_legend'>Durée moyenne des sessions</p>
      </div>

    );
  }

  const CustomCursor = (x) => {
    const r = document.querySelector(":root");
    if (ref.current?.offsetWidth) {
      r.style.setProperty("--width-r", `${ref.current.offsetWidth - x}px`);
    }

  };

  const onMouseMove = () => {
    const r = document.querySelector(":root");
    r.style.setProperty("--opacity-r", 0.0975);
  };

  const onMouseLeave = () => {
    const r = document.querySelector(":root");
    r.style.setProperty("--opacity-r", 0);
  };

  const tickFormatter = (nbJ) => {
    return nbJ == 1 ? "L" : nbJ == 2 || nbJ == 3 ? "M" : nbJ == 4 ? "J" : nbJ == 5 ? "V" : nbJ == 6 ? "S" : "D";
  }

  const customAxis = (props) => {
    const { x, y, payload } = props
    return (
      <g>
        <text x={x} y={y} dy={16} fill='#FFF' className='line_chart_days'>
          {tickFormatter(payload.value)}
        </text>
      </g>
    )
  }

  const customDot = (props) => {
    const { cx, cy } = props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" x={cx - 10} y={cy - 10} width="18" height="19" viewBox="0 0 18 19" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9 13.8607C11.2091 13.8607 13 12.0809 13 9.88545C13 7.68999 11.2091 5.91022 9 5.91022C6.79086 5.91022 5 7.68999 5 9.88545C5 12.0809 6.79086 13.8607 9 13.8607Z" fill="white" />
        <path d="M9 16.3607C12.5752 16.3607 15.5 13.4762 15.5 9.88545C15.5 6.29466 12.5752 3.41022 9 3.41022C5.42481 3.41022 2.5 6.29466 2.5 9.88545C2.5 13.4762 5.42481 16.3607 9 16.3607Z" stroke="white" strokeOpacity="0.198345" strokeWidth="5" />
      </svg>
    );
  };


  const customTooltip = (props) => {
    const { active, payload, coordinate } = props
    CustomCursor(coordinate.x);
    if (active && payload && payload.length) {
      return (
        <div className="line_chart_tooltip">
          <p className="line_chart_tooltip_legend">{payload[0].payload.sessionLength} min</p>
        </div>
      );
    }

    return null;
  }

  function recupData() {
    UserService.getAverageSession(id).then((res) => {
      if (res.status == 200) {
        setSessions(res.data.data.sessions)
      }
    })
  }

  useEffect(() => {
    recupData()
  }, [])

  return (
    <div className='container_line_chart' ref={ref}>
      <LineChart

        width={258}
        height={263}
        data={sessions}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        className='line_chart'
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={customAxis} />
        <Tooltip content={customTooltip} />
        <Line type="monotone" dataKey="sessionLength" dot={false} activeDot={customDot} stroke="white" />
        <Legend verticalAlign='top' content={customLegend} />
      </LineChart>
    </div>
  )
}
