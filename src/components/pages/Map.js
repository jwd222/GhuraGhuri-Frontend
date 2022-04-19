import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Room, Star } from "@material-ui/icons";
import "./Map.css"
import axios from "axios";
import {format} from "timeago.js"

function Map(){
    const [pins, setPins] = useState([]);
    const [showPopup, setShowPopup] = useState(true);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);

    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id);
      };

    const [viewport, setViewport] = useState({
        latitude:  23.777,
        longitude: 90.399,
        zoom: 14
    });  

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
            initialViewState={{
                latitude:  23.777,
                longitude: 90.399,
                zoom: 14
            }}            
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken='pk.eyJ1IjoiZmFyaWFiaW50ZWthZGVyIiwiYSI6ImNsMjVwMWdyNDA2YmozYm8wZDk1MDkyb2sifQ.MNgRzV6q5svRlvzeziFZsQ'   
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
                    style={{color:"slateblue"}}
                    onClick={()=>{}}                
                    />
                </Marker>
                {/* {p.id === setCurrentPlaceId && ( */}
                <Popup 
                    latitude={p.lat} 
                    longitude={p.lng}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="left"
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
                {/* )} */}
            </React.Fragment>
            ))}
        </ReactMapGL>
        </div>
    )
}

export default Map;