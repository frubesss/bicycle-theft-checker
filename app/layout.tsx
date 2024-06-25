import type { Metadata } from "next"
import React from "react"
import "./global.css"

export const metadata: Metadata = {
  title: "Bicycle Theft Checker",
  description:
    "Stay informed about bicycle theft incidents in your area. Use our app to check real-time data and ensure your bike's safety.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
