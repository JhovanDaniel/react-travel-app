import * as React from 'react';
// import ReactMapGL from 'react-map-gl';
import Map, {Marker, Popup} from 'react-map-gl';
import { Room, Star } from '@material-ui/icons'
import axios from 'axios'
import {format} from 'timeago.js'
import "./app.css"


function App() {

const [pins, setPins] = React.useState([])

const [currentPlaceId, setCurrentPlaceId] = React.useState(null)

const [showPopup, setShowPopup] = React.useState(true);

const [viewport, setViewport] = React.useState({
  width: "100vw",
  height: "100vh",
  latitude: 18.200409624631693,
  longitude: -63.06103528533779,
  zoom: 15
})

React.useEffect(() => {
  const getPins = async () => {
    try{ 
      const res = await axios.get("/pins");
      setPins(res.data)
    } catch(err){
      console.log(err)
    }
  };
  getPins()
}, [])

const handleMarkerClick = (id) => {
  setCurrentPlaceId(id)
  // setShowPopup((prevShowPopup) => !prevShowPopup)
}

//State check


  return (
    <div className='App'>
      <Map
        initialViewState={{
          ...viewport
        }}
        style={{width: "100vw", height: "100vh"}}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
      >
        
        {pins.map(p =>(
          console.log(currentPlaceId, p._id),
          <>
          <Marker longitude={p.long} latitude={p.lat} offsetLeft={-20} offsetRight={-10}>

            <Room style={{fontSize:viewport.zoom * 2, color:"slateblue"}}
            onClick={()=>handleMarkerClick(p._id)}
            />
          </Marker>

          {p._id === currentPlaceId && (
          <Popup 
            longitude={p.long} 
            latitude={p.lat}
            anchor="left"
            >
            <div className='card'>
            <label>Place</label>
            <h4 className='place'>{p.title}</h4>
            <label>Review</label>
            <p className='desc'>{p.desc}</p>
            <label>Rating</label>
            <div className='stars'>
              <Star className='star'/>
              <Star className='star'/>
              <Star className='star'/>
              <Star className='star'/>
              <Star className='star'/>
            </div>
            <label>Information</label>
            <span className='username'> Created by <b>{p.username}</b></span>
            <span className='date'> {format(p.createdAt)} </span>
            </div>
          </Popup>)
          }
        </>
        ))}
      </Map>
    </div>
    
  );
}

export default App;
