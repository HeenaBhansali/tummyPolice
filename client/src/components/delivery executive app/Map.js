import React, { useEffect, useState, useRef } from "react"
import "./mapStyle.css"
import Leaflet from "leaflet"
import "leaflet-routing-machine"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

function Map() {
  const [liveLocation, setLiveLocation] = useState({
    latitude: "",
    longitude: ""
  })

  const position = [12.9606811, 77.6436253]
  const position2 = [liveLocation.latitude, liveLocation.longitude]

  socket.on("current location", function(location) {
    setLiveLocation(location)
  })
  const mapRef = useRef(null)
  const map = () => {
    mapRef.current = Leaflet.map("mapid").setView(position, 40)

    Leaflet.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ).addTo(mapRef.current)

    Leaflet.marker(position).addTo(mapRef.current)
  }

  useEffect(() => {
    map()
  }, [])

  const markerRef = useRef(null)
  useEffect(() => {
    if (markerRef.current) {
      console.log("markerRef", markerRef.current)
      markerRef.current.setLatLng(position2)
    } else {
      markerRef.current = Leaflet.marker(position2).addTo(mapRef.current)
    }
    // Leaflet.Routing.control({
    //   waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)]
    // }).addTo(mapRef.current)
  }, [liveLocation])

  return <div id="mapid"></div>
}

export default Map