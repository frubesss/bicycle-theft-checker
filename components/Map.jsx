import React from 'react'
import GoogleMapReact from 'google-map-react'

import { CustomMarker } from './CustomMarker'

export function Map({ userLocation, bicycleThefts }) {
  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <GoogleMapReact
        options={{ fullscreenControl: false }}
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
        defaultCenter={{
          lat: userLocation.latitude,
          lng: userLocation.longitude,
        }}
        defaultZoom={13}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) =>
          new google.maps.Circle({
            strokeColor: '#1aa086',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#1aa086',
            fillOpacity: 0.3,
            map,
            center: { lat: userLocation.latitude, lng: userLocation.longitude },
            radius: 1900,
          })
        }
      >
        <CustomMarker
          color="#4285F4"
          lat={userLocation.latitude}
          lng={userLocation.longitude}
        />
        {bicycleThefts.map((bicycleTheft) => (
          <CustomMarker
            color="#9C51B6"
            key={bicycleTheft.id}
            lat={bicycleTheft.location.latitude}
            lng={bicycleTheft.location.longitude}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}
