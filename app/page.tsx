"use client"

import { useEffect, useState } from 'react'
import { Map } from './components/Map'

export default function Home() {

  const [bicycleThefts, setBicycleThefts] = useState([])
  const [userLocation, setUserLocation] = useState({
    hasLocation: false,
    latitude: 0,
    longitude: 0,
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
        .then((responseJson) => {
          setBicycleThefts(
            responseJson?.filter(
              (crimeData) => crimeData.category === 'bicycle-theft'
            )
          )
        })
    }
  }, [userLocation.hasLocation])

  return (
      <main>
        <Map userLocation={userLocation} bicycleThefts={bicycleThefts} />
      </main>
  )
}
