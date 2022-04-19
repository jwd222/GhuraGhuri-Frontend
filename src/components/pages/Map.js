import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Room, Star } from "@material-ui/icons";
import "./Map.css"
import axios from "axios";

function Map(){
    const [pins, setPins] = useState([]);


    const [showPopup, setShowPopup] = React.useState(true);
    useEffect(() => {
        const getPins = async () => {
          try {
            const allPins = await axios.get("/pins");
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
            <>
                <Marker
                    latitude={23.777}
                    longitude={90.399}
                    offsetLeft={-20}
                    offsetTop={-10}    
                >
                    <Room style={{color:"slateblue"}}/>
                </Marker>
                <Popup 
                    longitude={90.399} 
                    latitude={23.777}
                    anchor="left"
                    onClose={() => setShowPopup(false)}>
                    <div classsName="card">
                        <label>Place</label>
                            <h4 className="place">Some place</h4>
                        <label>Review</label>
                            <p className="desc">some review</p>
                        <label>Rating</label>
                        <div className="star">
                            <Star className="star"/>
                            <Star className="star"/>
                            <Star className="star"/>
                            <Star className="star"/>
                            <Star className="star"/>
                        </div>
                        <label>Information</label>
                        <span className="username">
                            Created by <b>Jawad</b>
                        </span>
                    </div>
                </Popup>
            </>
            ))}
        </ReactMapGL>
        </div>
    )
}

export default Map;