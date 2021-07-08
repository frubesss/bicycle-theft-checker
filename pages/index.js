import Head from 'next/head'
import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'

import { TheftCard } from '../components/TheftCard'

export default function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#a270bc',
      },
      secondary: {
        main: '#4285F4',
      },
      text: {
        primary: '#fff',
      },
    },
  })

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
          <TheftCard />
        </ThemeProvider>
      </main>
    </div>
  )
}
