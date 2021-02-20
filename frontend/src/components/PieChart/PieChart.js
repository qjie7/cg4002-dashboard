import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'

const PieChart = () => {
  const [pieData, setPieData] = useState({})

  const pieChart = () => {
    setPieData({
      labels: ['Win', 'Lose'],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ['#2FDE00', '#B21F00'],
          hoverBackgroundColor: ['#1f7a00', '#820d1f'],

          borderWidth: 4,
        },
      ],
    })
  }

  useEffect(() => {
    pieChart()
  }, [])

  return (
    <div
      style={{
        height: 600,
        width: 600,

        position: 'absolute',
        marginTop: 10,
        left: 50,
      }}
    >
      <Pie
        data={pieData}
        options={{
          responsive: true,
          title: {
            display: true,
            text: 'Win Rate',
            fontSize: 30,
            position: 'top',
          },
        }}
      />
    </div>
  )
}

export default PieChart
