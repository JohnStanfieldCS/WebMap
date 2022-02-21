import React, { useState } from "react";
import { 
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
  } from "react-google-maps";
import airportData from "./data/airports.json";
import mapStyle from "./mapStyle";


// could add this to another file if you wanted
// returns the library we are using, Google Map
function Map() {
  // implementing logic to keep the state of click, setting up info window
  const [selectedRunway, setSelectedRunway] = useState(null); // value, setter

  return (
    <GoogleMap 
      defaultZoom={ 12 } 
      defaultCenter={{ lat:32.12855, lng:-81.18667 }}
      defaultOptions={{styles: mapStyle}}
    > 
      //splitting into opening and closing tags so we can embed the data into here
      {airportData.Airports.map(runway => (
        <Marker 
          key={runway.Runways.Runway_Number} 
          position=
            {{
              lat:runway.Runways.Latitude, 
              lng: runway.Runways.Longitude
            }}
            onClick={() => { 
              setSelectedRunway(runway)
            }}
        />
      ))}
      // infowindow display, logic to display the selected park details when selected is true

      {selectedRunway && (
        <InfoWindow
          position=
            {{
              lat:selectedRunway.Runways.Latitude, 
              lng: selectedRunway.Runways.Longitude
            }}
            onCloseClick={() => {
              setSelectedRunway(null);
            }}
        >
          <div>  
            <h2>
              "ICAO": {selectedRunway.Runways.Airport},
            </h2>
            <h2>
              "Runway": {selectedRunway.Runways.Runway_Number}
            </h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

// to use GoogleMap, basically always need a script that loads all of the different google libraries
// need to wrap map function in other functions. Below:
const WrappedMap = withScriptjs(withGoogleMap(Map));


// leaving this alone for the moment

// need to actually use wrapped map, elements needed to load (give size and shape)
// api key and url to api

// add the key directly into URL for now, legacy api fix
export default function App () {
  return (
    <div style={{width: '100vw', height: '100vh'}}> 
      < WrappedMap 
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAi_ZXpIipfjEjOaqhQ368kNlfn1aXraR0'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
