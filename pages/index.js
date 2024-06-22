import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'

import { Map } from '../components/Map'
import { CircularProgress } from '@material-ui/core'

export default function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#987A71',
      },
      secondary: {
        main: '#A9A878',
      },
      text: {
        primary: '#F2E5C1',
      },
    },
  })

  const [bicycleThefts, setBicycleThefts] = useState([])
  const [hasBicycleThefts, setHasBicycleThefts] = useState(false)
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
    if (userLocation.hasLocation === true) {
      fetch(
        `https://data.police.uk/api/crimes-street/all-crime?lat=${userLocation.latitude}&lng=${userLocation.longitude}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setBicycleThefts(
            responseJson?.filter(
              (crimeData) => crimeData.category === 'bicycle-theft'
            )
          )
          setHasBicycleThefts(true)
        })
    }
  }, [userLocation.hasLocation])

  return (
    <div>
      <Head>
        <title>Bicycle Theft Checker</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main>
        <ThemeProvider theme={theme}>
          {userLocation.hasLocation && hasBicycleThefts ? (
            <Map userLocation={userLocation} bicycleThefts={bicycleThefts} />
          ) : (
            <div
              style={{
                height: '100vh',
                width: '100%',
                backgroundColor: '#e3e4de',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </div>
          )}
        </ThemeProvider>
      </main>
    </div>
  )
}
