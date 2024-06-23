'use client'

import { useEffect, useState } from 'react'
import { Map } from './components/Map'

export default function Home() {

  const [bicycleThefts, setBicycleThefts] = useState([])
  const [hasBicycleThefts, setHasBicycleThefts] = useState(false)
  const [userLocation, setUserLocation] = useState({
    hasLocation: false,
    latitude: 0,
    longitude: 0
  })

  useEffect(() => {
    if (!userLocation.hasLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation((previousUserLocation) => {
            return {
              ...previousUserLocation,
              hasLocation: true,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          })
        },
        (error) => {
          console.log(error)
        },
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 0
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
        .then((responseJson) => {
          setHasBicycleThefts(true)
          setBicycleThefts(
            responseJson?.filter(
              (crimeData: { category: string }) => crimeData.category === 'bicycle-theft'
            )
          )
        })
    }
  }, [userLocation.hasLocation])

  return (
    <main>
      <style>
        {`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}
      </style>
      {!userLocation.hasLocation && hasBicycleThefts ? (
        <Map userLocation={userLocation} bicycleThefts={bicycleThefts} />
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #A9A878',
            borderRadius: '50%',
            width: '15px',
            height: '15px',
            animation: 'spin 2s linear infinite'
          }} />
        </div>
      )}
    </main>
  )
}
