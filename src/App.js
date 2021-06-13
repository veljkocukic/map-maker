import './App.css';
import { MyMapComponent } from "./Map.js"
import { DataContext } from "./Data"
import React, { useEffect, useContext, useRef } from "react"



function App() {

  let { setMarkers } = useContext(DataContext)
  const buttonRef = useRef(null)
  const txtarea = useRef(null)
  const handleButtonClick = () => {
    let submitted = txtarea.current.value.replace(" ", "").split(/\r?\n/)
    let submittedConverted = submitted.map((item, key) => {
      let splitted = item.split(",")
      return { lat: Number(splitted[0]), lng: Number(splitted[1]), color: splitted[2], colorCount: -1 }
    })
    setMarkers(prev => [...prev, ...submittedConverted])
    txtarea.current.value = ""
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      buttonRef.current.click()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);

    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  })


  return (
    <div className="App">
      <div className="map-wrapper">
        <MyMapComponent
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&callback=initMap`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      <textarea ref={txtarea} placeholder="Enter text" />
      <button ref={buttonRef} onClick={handleButtonClick}>Submit</button>
    </div>)

}

export default App;
