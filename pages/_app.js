import React from 'react'
import App from 'next/app'

import './index.css'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}
