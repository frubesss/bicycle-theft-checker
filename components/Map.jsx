import React from 'react'
import GoogleMapReact from 'google-map-react'

import { CustomMarker } from './CustomMarker'
import { TheftCard } from './TheftCard'

export function Map({ userLocation, bicycleThefts }) {
  const heatmapData = {
    positions: bicycleThefts.map((bicycleTheft) => ({
      lat: bicycleTheft.location.latitude,
      lng: bicycleTheft.location.longitude,
      weight: Math.floor(Math.random() * Math.floor(5)),
    })),
    options: {
      radius: 70,
      opacity: 0.4,
    },
  }
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        options={{ fullscreenControl: false }}
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
          libraries: ['visualization'],
        }}
        defaultCenter={{
          lat: userLocation.latitude,
          lng: userLocation.longitude,
        }}
        heatmap={heatmapData}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
      >
        <CustomMarker
          color="#4285F4"
          lat={userLocation.latitude}
          lng={userLocation.longitude}
        />
        {bicycleThefts.map((bicycleTheft) => (
          <CustomMarker
            color="#A9A878"
            key={bicycleTheft.id}
            lat={bicycleTheft.location.latitude}
            lng={bicycleTheft.location.longitude}
          />
        ))}
      </GoogleMapReact>
      <TheftCard bicycleThefts={bicycleThefts} />
    </div>
  )
}
