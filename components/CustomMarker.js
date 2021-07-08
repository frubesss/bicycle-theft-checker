import React from 'react'

export function CustomMarker({ color }) {
  return (
    <svg width={24} height={24}>
      <ellipse fill="#fff" cx={12} cy={12} rx={12} ry={12} />
      <ellipse fill={color} cx={12} cy={12} rx={9} ry={9} />
    </svg>
  )
}
