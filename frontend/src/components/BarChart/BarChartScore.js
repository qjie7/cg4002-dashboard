import React from 'react'
import { Bar, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false

const BarChartScore = (props) => {
  return (
    <div>
      <Bar
        data={{
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          datasets: [
            {
              label: 'Scores',
              data: [
                props.oneScore,
                props.twoScore,
                props.threeScore,
                props.fourScore,
                props.fiveScore,
                props.sixScore,
                props.sevenScore,
                props.eightScore,
                props.nineScore,
                props.tenScore,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(110, 110, 110, 0.2)',
                'rgba(0, 201, 54, 0.2)',
                'rgba(0, 11, 54, 0.2)',
                'rgba(0, 11, 200, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(110, 110, 110, 1)',
                'rgba(0, 201, 54, 1)',
                'rgba(0, 11, 54, 1)',
                'rgba(0, 11, 200, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          title: {
            display: true,
            position: 'top',
            fontStyle: 'bold',
            fontSize: 16,
            padding: 30,
            text: 'Score Frequency Table',
          },

          legend: {
            display: false,
          },
        }}
      />
    </div>
  )
}

export default BarChartScore
