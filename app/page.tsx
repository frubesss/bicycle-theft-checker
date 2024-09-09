"use client"

import { useEffect, useState } from "react"
import { Map } from "./components/Map"

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
          setUserLocation({
            hasLocation: true,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error fetching location:", error)
        },
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 0,
        },
      )
    }
  }, [userLocation.hasLocation])

  useEffect(() => {
    if (userLocation.hasLocation) {
      fetch(
        `https://data.police.uk/api/crimes-street/all-crime?lat=${userLocation.latitude}&lng=${userLocation.longitude}`,
      )
        .then((response) => response.json())
        .then((data) => {
          const bicycleTheftsData = data.filter(
            (crime: { category: string }) => crime.category === "bicycle-theft",
          )
          setBicycleThefts(bicycleTheftsData)
        })
        .catch((error) => {
          console.error("Error fetching bicycle thefts:", error)
        })
    }
  }, [userLocation.hasLocation])

  return (
    <main>
      {userLocation.hasLocation && bicycleThefts ? (
        <Map userLocation={userLocation} bicycleThefts={bicycleThefts} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <div
            style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #A9A878",
              borderRadius: "50%",
              width: "15px",
              height: "15px",
              animation: "spin 2s linear infinite",
            }}
          />
          <p
            style={{
              marginTop: "20px",
              color: "#333",
              fontSize: "16px",
              fontFamily: "sans-serif",
              textAlign: "center",
            }}
          >
            Please ensure you have location services enabled
          </p>
        </div>
      )}
    </main>
  )
}
