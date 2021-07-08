import React, { useEffect, useState } from 'react'

import Typography from '@material-ui/core/Typography'

export const MainContent = () => {
  const [bicycleThefts, setBicycleThefts] = useState([])
  const [userLocation, setUserLocation] = useState({
    hasLocation: false,
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    if (userLocation.hasLocation === false) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation((previousUserLocation) => {
            return {
              ...previousUserLocation,
              hasLocation: true,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          })
        },
        (error) => {
          console.log(error)
        },
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 0,
        }
      )
    }
  }, [userLocation.hasLocation])

  useEffect(() => {
    if (userLocation.hasLocation) {
      fetch(
        `https://data.police.uk/api/crimes-street/all-crime?lat=${userLocation.latitude}&lng=${userLocation.longitude}`
      )
        .then((response) => response.json())
        .then((responseJson) =>
          setBicycleThefts(
            responseJson?.filter(
              (crimeData) => crimeData.category === 'bicycle-theft'
            )
          )
        )
    }
  }, [userLocation.hasLocation])

  const determineTheftWarningLevel = (bicycleThefts) => {
    switch (true) {
      case bicycleThefts.length >= 101 && bicycleThefts.length <= 200:
        return 'High'
      case bicycleThefts.length >= 51 && bicycleThefts.length <= 100:
        return 'Medium'
      case bicycleThefts.length >= 0 && bicycleThefts.length <= 50:
        return 'Low'
      default:
        return 'Low'
    }
  }

  return (
    <div
      style={{
        margin: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Typography
        style={{
          marginBottom: '30px',
        }}
        color="textPrimary"
        variant="h3"
        component="h1"
      >
        <b>Bicycle Theft Checker</b>
      </Typography>
      Warning Level: {determineTheftWarningLevel(bicycleThefts)}
      <br />
      Bike thefts in this area (1 Mile Radius) this month:{' '}
      {bicycleThefts.length}
    </div>
  )
}
