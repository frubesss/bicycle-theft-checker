import React from "react"

const determineTheftWarningLevel = (bicycleTheftCount: number) => {
  if (bicycleTheftCount >= 101 && bicycleTheftCount <= 200) {
    return { level: "High", color: "red" }
  } else if (bicycleTheftCount >= 51 && bicycleTheftCount <= 100) {
    return { level: "Medium", color: "orange" }
  } else {
    return { level: "Low", color: "green" }
  }
}

export const TheftCard = ({
  bicycleThefts = [],
}: {
  bicycleThefts: {
    id: number
    location: { latitude: number; longitude: number }
  }[]
}) => {
  const { level, color } = determineTheftWarningLevel(bicycleThefts.length)

  return (
    <div
      style={{
        width: "200px",
        position: "absolute",
        top: 20,
        left: 60,
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Bicycle Thefts</h2>
        <div style={{ marginBottom: "10px" }}>This month</div>
        <div
          style={{
            marginBottom: "10px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#878660",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "1.2em",
          }}
        >
          {bicycleThefts.length}
        </div>
        <div
          style={{
            padding: "4px 12px",
            borderRadius: "16px",
            backgroundColor: color,
            color: "#fff",
          }}
        >
          Theft level: {level}
        </div>
      </div>
    </div>
  )
}
