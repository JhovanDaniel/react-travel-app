import * as React from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import { Room, Star } from '@material-ui/icons'
import axios from 'axios'
import {format} from 'timeago.js'
import "./app.css"

import Register from './components/Register';
import Login from './components/Login';

(Map).accessToken = process.env.REACT_APP_MAPBOX;


function App() {

const myStorage = window.localStorage;

//form states
const [currentUser, setCurrentUser] = React.useState(myStorage.getItem("user"))

const [title, setTitle] = React.useState(null)
const [desc, setDesc] = React.useState(null)
const [rating, setRating] = React.useState(0)

const [pins, setPins] = React.useState([])
const [currentPlaceId, setCurrentPlaceId] = React.useState(null)
const [newPlace, setNewPlace] = React.useState(null)

const [showRegister, setShowRegister] = React.useState(false)
const [showLogin, setShowLogin] = React.useState(false)

const [viewport, setViewport] = React.useState({
  width: '100vw',
  height: '100vh',
  latitude: 18.200409624631693,
  longitude: -63.06103528533779,
  zoom: 6,
  renderWorldCopies: false
})

React.useEffect(() => {
  const getPins = async () => {
    try{ 
      const res = await axios.get("https://react-travel-app-api.vercel.app/api/pins");
      setPins(res.data)
    } catch(err){
      console.log(err)
    }
  };
  getPins()
}, [])

const handleMarkerClick = (id, lat, long) => {
  setCurrentPlaceId(id)
  // Need to work on fly to functionality and animation
  setViewport({ ...viewport, latitude: lat, longitude: long });
}


const handleAddClick = (e) => {
  const { lat, lng: long } = e.lngLat;
  setNewPlace({ lat, long });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const newPin = {
    username:currentUser,
    title,
    desc,
    rating,
    lat: newPlace.lat,
    long:newPlace.long,
  }

  try{
    const res = await axios.post("/pins", newPin);
    setPins([...pins, res.data])
    setNewPlace(null)

  }catch(err){
    console.log(err)
  }
}

const handleLogout = () => {
  myStorage.removeItem("user")
  setCurrentUser(null)
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
        onDblClick={handleAddClick}
      >
        { pins.map(p =>(
          <>
          <Marker longitude={p.long} latitude={p.lat} offsetLeft={-20} offsetRight={-10} onClick={() => handleMarkerClick(p._id, p.lat, p.long) }>

            <Room style={{fontSize: viewport.zoom * 5, 
            color: p.username === currentUser ? "tomato" : "slateblue", 
            cursor: "pointer"}}
            />
          </Marker>

          {p._id === currentPlaceId && (
          <Popup 
            longitude={p.long} 
            latitude={p.lat}
            anchor="left"
            closeOnClick={false}
            onClose={() => setCurrentPlaceId(null)}
            >
            <div className='card'>
            <label>Place</label>
            <h4 className='place'>{p.title}</h4>
            <label>Review</label>
            <p className='desc'>{p.desc}</p>
            <label>Rating</label>
            <div className='stars'>
              { Array(p.rating).fill(<Star className='star'/>)}
            </div>
            <label>Information</label>
            <span className='username'> Created by <b>{p.username}</b></span>
            <span className='date'> {format(p.createdAt)} </span>
            </div>
          </Popup>)
          }
        </>
        ))}

        { newPlace && (
          <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor='left'
          onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label> Title </label>
                <input placeholder='Enter a title' onChange={(e) => setTitle(e.target.value)}/>
                <label> Review </label>
                <textarea placeholder='Say something about this place' onChange={(e) => setDesc(e.target.value)}/>
                <label> Rating </label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className='submitButton' type='submit'> Add Pin </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser? (<button className='button logout' onClick={handleLogout}> Logout </button>) : 
        (<div className='buttons'>
          <button className='button login' onClick={() => setShowLogin(true)}> Log In </button>
          <button className='button register' onClick={() => setShowRegister(true)}> Register </button>
        </div>)
        }
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}
        
      </Map>
    </div>
    
  );
}

export default App;
