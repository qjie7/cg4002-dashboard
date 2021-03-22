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
      ],
    })
  }

  useEffect(() => {
    lineChart()
  }, [])

  return (
    <div style={{ width: '100%' }}>
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
