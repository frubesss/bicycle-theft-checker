import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export const TheftCard = ({ bicycleThefts = [] }) => {
  const determineTheftWarningLevel = () => {
    switch (true) {
      case bicycleThefts.length >= 101 && bicycleThefts.length <= 200:
        return { level: 'High', color: 'red' }
      case bicycleThefts.length >= 51 && bicycleThefts.length <= 100:
        return { level: 'Medium', color: 'orange' }
      case bicycleThefts.length >= 0 && bicycleThefts.length <= 50:
        return { level: 'Low', color: 'green' }
      default:
        return 'Low'
    }
  }

  return (
    <Card>
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          style={{
            marginBottom: '10px',
          }}
          variant="h5"
          component="h2"
          color="secondary"
        >
          Bicycle Thefts
        </Typography>
        <div
          style={{
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            padding: '20px',
            background: determineTheftWarningLevel(bicycleThefts).color,
            color: 'white',
            textAlign: 'center',
            font: '32px Arial, sans-serif',
            marginBottom: '10px',
          }}
        >
          {bicycleThefts.length}
        </div>
        <Typography variant="h5" component="h2" color="secondary">
          {determineTheftWarningLevel(bicycleThefts).level}
        </Typography>
      </CardContent>
    </Card>
  )
}
