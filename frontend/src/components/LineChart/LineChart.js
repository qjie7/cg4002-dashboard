import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = () => {
  const [lineData, setLineData] = useState({})

  const lineChart = () => {
    setLineData({
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Dab',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#96a3ff',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56, 19, 10, 12, 12, 20, 51, 11],
        },
        {
          label: 'Elbow-Kick',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#2FDE00',
          borderColor: 'rgba(233,42,23,52)',
          borderWidth: 2,
          data: [13, 23, 22, 90, 11],
        },
        {
          label: 'Gun',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#B21F00',
          borderColor: 'rgba(233,42,111,4)',
          borderWidth: 2,
          data: [13, 11, 10, 96, 11],
        },
        {
          label: 'Hair',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#e630d9',
          borderColor: 'rgba(90,99,77,4)',
          borderWidth: 2,
          data: [7, 93, 22, 77, 80],
        },
        {
          label: 'Listen',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#572985',
          borderColor: 'rgba(3,42,111,4)',
          borderWidth: 2,
          data: [14, 29, 110, 19, 52],
        },
        {
          label: 'Point-High',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#11a3a6',
          borderColor: 'rgba(150,122,11,4)',
          borderWidth: 2,
          data: [10, 19, 75, 28, 100],
        },
        {
          label: 'Side-Pump',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#a2bf0d',
          borderColor: 'rgba(23,100,111,4)',
          borderWidth: 2,
          data: [13, 35, 80, 10, 19],
        },
        {
          label: 'Wipe-Table',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#c96d10',
          borderColor: 'rgba(150,42,111,4)',
          borderWidth: 2,
          data: [70, 11, 93, 10, 36],
        },
      ],
    })
  }

  useEffect(() => {
    lineChart()
  }, [])

  return (
    <div style={{ width: 1100, height: 700, position: 'absolute', top: '50%' }}>
      <Line
        data={lineData}
        options={{
          title: {
            display: true,
            text: 'Average Accurary Overtime',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
    </div>
  )
}

export default LineChart
