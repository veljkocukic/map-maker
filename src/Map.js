import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { useContext, useRef } from "react"
import { DataContext } from "./Data"

export const MyMapComponent = withScriptjs(withGoogleMap((props) => {

    let { markers, setMarkers, timesClicked, setTimesClicked, colors } = useContext(DataContext)
    let gmap = useRef(null)
    const handleClick = (e) => {
        const lat = parseFloat(e.latLng.lat());
        const lng = parseFloat(e.latLng.lng());
        setMarkers(prev => [...prev, { lat, lng }])
        localStorage.setItem("markers", [...markers])
    }

    const handleDragEnd = () => {
        localStorage.setItem("center", JSON.stringify({ lat: gmap.current.getCenter().lat(), lng: gmap.current.getCenter().lng() }))
        localStorage.setItem("zoom", gmap.current.getZoom())
    }

    const handleMarkerClick = (lat, lng) => {
        if (timesClicked < 5) {
            setTimesClicked(++timesClicked)
        } else {
            setTimesClicked(0)
        }

        setMarkers(prev => prev.map(item => {
            if (item.lng === lng && item.lat === lat) {
                return { ...item, color: colors[timesClicked] }
            }
            return item
        }))
    }

    const handleRightClickMarker = (lat, lng) => {
        setMarkers(prev => prev.filter(item => item.lng !== lng && item.lat !== lat))
    }

    return <GoogleMap
        defaultZoom={JSON.parse(localStorage.getItem("zoom")) || 2}
        defaultCenter={JSON.parse(localStorage.getItem("center")) || { lat: 25, lng: 0 }}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
        ref={gmap}
    >
        {markers.map((item, key) => {
            let color = item.color ? `http://maps.google.com/mapfiles/ms/icons/${item.color}.png` : "http://maps.google.com/mapfiles/ms/icons/red.png"
            return <Marker key={key} position={{ lat: item.lat, lng: item.lng }} icon={color} onRightClick={() => handleRightClickMarker(item.lat, item.lng)} onClick={() => {
                handleMarkerClick(item.lat, item.lng)
            }} />
        })}
    </GoogleMap>
}
))
