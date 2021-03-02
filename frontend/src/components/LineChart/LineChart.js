import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = ({ data, text, label, borderColor, time }) => {
  const [lineData, setLineData] = useState({})
  console.log(data)

  const lineChart = () => {
    setLineData({
      labels: time,
      datasets: [
        {
          label: label,
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#96a3ff',
          borderColor: borderColor,
          borderWidth: 2,
          data: data,
        },
        // {
        //   label: 'Elbow-Kick',
        //   fill: false,
        //   lineTension: 0.5,
        //   backgroundColor: '#2FDE00',
        //   borderColor: 'rgba(233,42,23,52)',
        //   borderWidth: 2,
        //   data: { data },
        // },
        // {
        //   label: 'Gun',
        //   fill: false,
        //   lineTension: 0.5,
        //   backgroundColor: '#B21F00',
        //   borderColor: 'rgba(233,42,111,4)',
        //   borderWidth: 2,
        //   data: [13, 11, 10, 96, 11],
        // },
        // {
        //   label: 'Hair',
        //   fill: false,
        //   lineTension: 0.5,
        //   backgroundColor: '#e630d9',
        //   borderColor: 'rgba(90,99,77,4)',
        //   borderWidth: 2,
        //   data: [7, 93, 22, 77, 80],
        // },
        // {
        //   label: 'Listen',
        //   fill: false,
        //   lineTension: 0.5,
        //   backgroundColor: '#572985',
        //   borderColor: 'rgba(3,42,111,4)',
        //   borderWidth: 2,
        //   data: [14, 29, 110, 19, 52],
        // },
        // {
        //   label: 'Point-High',
        //   fill: false,
        //   lineTension: 0.5,
        //   backgroundColor: '#11a3a6',
        //   borderColor: 'rgba(150,122,11,4)',
        //   borderWidth: 2,
        //   data: [10, 19, 75, 28, 100],
        // },
        // {
        //   label: 'Side-Pump',
        //   fill: false,
        //   lineTension: 0.5,
        //   backgroundColor: '#a2bf0d',
        //   borderColor: 'rgba(23,100,111,4)',
        //   borderWidth: 2,
        //   data: [13, 35, 80, 10, 19],
        // },
        // {
        //   label: 'Wipe-Table',
        //   fill: false,
        //   lineTension: 0.5,
        //   backgroundColor: '#c96d10',
        //   borderColor: 'rgba(150,42,111,4)',
        //   borderWidth: 2,
        //   data: [70, 11, 93, 10, 36],
        // },
      ],
    })
  }

  useEffect(() => {
    lineChart()
  }, [])

  return (
    <div style={{ width: 600, height: 400 }}>
      <Line
        data={lineData}
        options={{
          title: {
            display: true,
            text: text,
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
