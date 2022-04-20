import React, { useEffect, useState } from "react";
import ReactMapGL, { 
  Marker, 
  Popup, 
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Room, Star } from "@material-ui/icons";
import "./Map.css"
import axios from "axios";


function Map(){
    const TOKEN = 'pk.eyJ1IjoiZmFyaWFiaW50ZWthZGVyIiwiYSI6ImNsMjVwMWdyNDA2YmozYm8wZDk1MDkyb2sifQ.MNgRzV6q5svRlvzeziFZsQ'
    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [username, setUsername] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [star, setStar] = useState(0);
    const [viewState, setViewState] = useState({
        latitude:  23.777,
        longitude: 90.399,
        zoom: 12
    });
    const [settings, setsettings] = useState({
        touchZoom: false,
        touchRotate: false,
        keyboard: false,
        doubleClickZoom: false
        });
    const handleMarkerClick = (id, lat, lng) => {
        setCurrentPlaceId(id);
        setViewState({ zoom: 14, latitude: lat, longitude: lng });
    };
    const handleAddClick = (e) => {
        const latitude = e.lngLat.lat
        const longitude = e.lngLat.lng
        setNewPlace({
            lat: latitude,
            lng: longitude,
        });
        console.log(e)
    }
    const handleSubmit = async (e) => {
            const newPin = {
            title,
            desc,
            rating: star,
            lat: newPlace.lat,
            lng: newPlace.lng,
        };
    
        try {
          const res = await axios.post("http://localhost:8081/pins/addPin", newPin);
          setPins([...pins, res.data]);
          setNewPlace(null);
        } catch (err) {
          console.log(err);
        }
      }

    useEffect(() => {
        const getPins = async () => {
          try {
            const allPins = await axios.get("http://localhost:8081/pins/getAllPins");
            setPins(allPins.data);
          } catch (err) {
            console.log(err);
          }
        };
        getPins();
      }, [])

      useEffect(()=>{
          const listener = e=>{
              if(e.key === "Escape"){
                  setCurrentPlaceId(null);
              }
          };
          window.addEventListener("keydown", listener);
      }, []);

      useEffect(()=>{
        const listener = e=>{
            if(e.key === "Escape"){
                setNewPlace(null);
            }
        };
        window.addEventListener("keydown", listener);
    }, []);
      

    return(
        <div style={{width: "100%", height: "90vh"}}>
        <ReactMapGL
            {...viewState}
            {...settings}
            onMove={evt => setViewState(evt.viewState)}
            transitionDuration="500"
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxAccessToken={TOKEN}
            onDblClick={handleAddClick}
        >
          <GeolocateControl position="top-left"/>
          <FullscreenControl position="top-left"/>
          <NavigationControl position="top-left"/>
          <ScaleControl />
            {pins.map(p=>(
            <React.Fragment key={p.id}>
                <Marker
                    latitude={p.lat}
                    longitude={p.lng}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                <Room 
                    style={{color:"slateblue", cursor:"pointer"}}
                    onClick={()=>handleMarkerClick(p.id, p.lat, p.lng)}                
                    />
                </Marker>
                {p.id === currentPlaceId && (
                <Popup 
                    latitude={p.lat} 
                    longitude={p.lng}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="left"
                    onClose={(e)=>{
                        console.log(e);
                    }}
                >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                </div>
                </Popup>
                )}
            </React.Fragment>
            ))}
            {newPlace && (
                <Popup 
                    latitude={newPlace.lat} 
                    longitude={newPlace.lng}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={(e)=>{
                        console.log(e);
                    }}
                    anchor="left"
                >
                <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
              </Popup>
                )}
        </ReactMapGL>
        </div>
    )
}

export default Map;