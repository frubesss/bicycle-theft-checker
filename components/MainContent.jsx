import React from 'react'

import Typography from '@material-ui/core/Typography'

export const MainContent = () => {
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
      <div style={{ maxWidth: '500px' }}>
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
      </div>
    </div>
  )
}
