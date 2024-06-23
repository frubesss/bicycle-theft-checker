import GoogleMapReact from 'google-map-react'

import { CustomMarker } from './CustomMarker'

export function Map({ userLocation, bicycleThefts }: {
  userLocation: { latitude: number, longitude: number },
  bicycleThefts: { id: number, location: { latitude: number, longitude: number } }[]
}) {

  const heatmapData = {
    positions: bicycleThefts.map((bicycleTheft) => ({
      lat: bicycleTheft.location.latitude,
      lng: bicycleTheft.location.longitude,
      weight: Math.floor(Math.random() * Math.floor(5))
    })),
    options: {
      radius: 70,
      opacity: 0.4
    }
  }


  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? '',
          libraries: ['visualization']
        }}
        defaultCenter={{
          lat: userLocation.latitude,
          lng: userLocation.longitude
        }}
        heatmap={heatmapData}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals
      >
        <CustomMarker
          color="#4285F4"
          // @ts-ignore
          lat={userLocation.latitude}
          lng={userLocation.longitude}
        />
        {bicycleThefts.map((bicycleTheft) => (
          <CustomMarker
            key={bicycleTheft.id}
            // @ts-ignore
            lat={bicycleTheft.location.latitude}
            lng={bicycleTheft.location.longitude}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}
