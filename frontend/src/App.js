import * as React from 'react';
// import ReactMapGL from 'react-map-gl';
import Map, {Marker, Popup} from 'react-map-gl';
import { Room, Star } from '@material-ui/icons'
import "./app.css"


function App() {
const [viewport, setViewport] = React.useState({
  width: "100vw",
  height: "100vh",
  latitude: 18.200409624631693,
  longitude: -63.06103528533779,
  zoom: 15
})
const [showPopup, setShowPopup] = React.useState(true);

  return (
    <Map
      initialViewState={{
        ...viewport
      }}
      style={{width: "100vw", height: "100vh"}}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
    >
      <Marker longitude={-63.06103528533779} latitude={18.200409624631693} offsetLeft={-20} offsetRight={-10}>
        {/* Figue how to change font size on zoom */}
        <Room style={{fontSize:viewport.zoom * 2, color:"slateblue"}}/>
      </Marker>
      {/* <Popup 
        longitude={-63.06103528533779} 
        latitude={18.200409624631693}
        anchor="left"
        >
        <div className='card'>
         <label>Place</label>
         <h4 className='place'> Little Harbor</h4>
         <label>Review</label>
         <p className='desc'> Beautiful place. I like it.</p>
         <label>Rating</label>
         <div className='stars'>
          <Star className='star'/>
          <Star className='star'/>
          <Star className='star'/>
          <Star className='star'/>
          <Star className='star'/>
         </div>
         <label>Information</label>
         <span className='username'> Created by <b> Jhovan</b></span>
         <span className='date'> 1 hour ago </span>
        </div>
      </Popup> */}
    </Map>
    
  );
}

export default App;
