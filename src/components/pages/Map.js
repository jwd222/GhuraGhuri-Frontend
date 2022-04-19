import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Room, Star } from "@material-ui/icons";
import "./Map.css"
import axios from "axios";
import {format} from "timeago.js"

function Map(){
    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState();
    const [newPlace, setNewPlace] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [star, setStar] = useState(0);
    const [viewState, setViewState] = useState({
        latitude:  23.777,
        longitude: 90.399,
        zoom: 14
    });
    const handleMarkerClick = (id, lat, lng) => {
        setCurrentPlaceId(id);
        setViewState({ ...viewState, latitude: lat, longitude: lng });
    };
    const handleAddClick = (e) => {
        setNewPlace({
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
          title,
          desc,
          rating: star,
          lat: newPlace.lat,
          long: newPlace.long,
        };
    
        try {
          const res = await axios.post("/pins", newPin);
          setPins([...pins, res.data]);
          setNewPlace(null);
        } catch (err) {
          console.log(err);
        }
      };

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

    return(
        <div style={{width: "100%", height: "100vh"}}>
        <ReactMapGL
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            transitionDuration="200"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken='pk.eyJ1IjoiZmFyaWFiaW50ZWthZGVyIiwiYSI6ImNsMjVwMWdyNDA2YmozYm8wZDk1MDkyb2sifQ.MNgRzV6q5svRlvzeziFZsQ'   
            onDblClick={handleAddClick}
        >
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
                    onClose={setCurrentPlaceId(null)}
                >
                    <div classsName="card">
                        <label>Place</label>
                            <h4 className="place">{p.title}</h4>
                        <label>Review</label>
                            <p className="desc">{p.desc}</p>
                        <label>Rating</label>
                        <div className="star">
                            <Star className="star"/>
                            <Star className="star"/>
                            <Star className="star"/>
                            <Star className="star"/>
                            <Star className="star"/>
                        </div>
                        <label>Information</label>
                            <span>
                                <p className="username">Created by <b>{p.username}</b></p>
                            </span>
                            <span>
                                <p>{format(p.date)}</p>
                            </span>
                    </div>
                </Popup>
                )}
                {newPlace && (
                <Popup 
                    latitude={newPlace.lat} 
                    longitude={newPlace.lng}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setNewPlace(null)}
                    anchor="left"
                >
                <div>
                <form>
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
            </React.Fragment>
            ))}
        </ReactMapGL>
        </div>
    )
}

export default Map;