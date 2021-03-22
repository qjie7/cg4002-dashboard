import React from 'react'
import { Bar, defaults } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false

const BarChart = (props) => {
  return (
    <div>
      <Bar
        data={{
          labels: [
            'Elbow Kick',
            'Dab',
            'Gun',
            'Hair',
            'Listen',
            'Point High',
            'Side Pump',
            'Wipe Table',
          ],
          datasets: [
            {
              label: 'View count of all the dance move',
              data: [
                props.elbowKickCount,
                props.dabCount,
                props.gunCount,
                props.hairCount,
                props.listenCount,
                props.pointHighCount,
                props.sidePumpCount,
                props.wipeTableCount,
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
            text: 'View Counts Of Each Dance Move',
          },

          legend: {
            display: false,
          },
        }}
      />
    </div>
  )
}

export default BarChart
