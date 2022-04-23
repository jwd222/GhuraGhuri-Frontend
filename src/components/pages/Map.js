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
  const id = localStorage.getItem('currentID');
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [division, setDivision] = useState(null);
  const [type, setType] = useState(null);
  const [star, setStar] = useState(0);
  const [imageURL, setImageURL] = useState(null);
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
  const getPins = async () => {
    try {
      const allPins = await axios.get("http://localhost:8081/location/getAll");
      setPins(allPins.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addImageURLbasedOnType = (t) => {
    if(t==='Historic'){
      setImageURL("https://www.remotelands.com/remotenew1/dist/images/itinerary/b170621013.jpg");
    }
    else if(t==='Beach'){
      setImageURL("https://portalsbd.com/wp-content/uploads/2018/11/Coxs-Bazar-Photo-1.jpg");
    }
    else if(t==='Mountain'){
      setImageURL("https://dailyasianage.com/library/2019/12/28/1577565314_3.jpg");
    }
    else if(t==='Amusement'){
      setImageURL("https://www.touristplaces.com.bd/images/pp/5/p112422.jpg");
    }
    else if(t==='Restaurant'){
      setImageURL("https://en.resto.be/across/resources/static/bc1603807c668add1145e9aa1c08e0b5fd10ac73/site/images/placeholder-detail-resto-1.jpg");
    }
    else if(t==='Hotel'){
      setImageURL("https://dailyasianage.com/library/2018/09/13/1536852615_2.jpg");
    }
    else if(t==='Forest'){
      setImageURL("https://dailyasianage.com/library/1619679223_9.jpg");
    }
    else if(t==='Park'){
      setImageURL("https://dailyasianage.com/library/2017/12/29/1514570638_1.jpg");
    }
    else {
      setImageURL('https://www.xda-developers.com/files/2019/03/GPS-location.png');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(imageURL);
    const newPin = {
        username,
        description,
        rating: star,
        lat: newPlace.lat,
        lng: newPlace.lng,
        name,
        division,
        type,
        imageURL
    };

    try {
      const res = await axios.post("http://localhost:8081/location/add", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
      console.log(newPin);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  const listener = e=>{
    if(e.key === "Escape"){
      setCurrentPlaceId(null)
      setNewPlace(null);
    }
  };

  const getUserName = () => {
    fetch('http://localhost:8081/user/getById/id?id='+id, {
    }).then(response => response.json())
    .then(data => {
      console.log(data);
     setUsername(data[0].name);
    })
  };

  useEffect(() => {
      getPins();
      getUserName();
      window.addEventListener("keydown", listener);
      window.addEventListener("keydown", listener);

      return() => {
        window.removeEventListener("keydown", listener)
      }
    }, [])

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
                  closeButton={false}
                  closeOnClick={false}
                  anchor="left"
                  onClose={(e)=>{
                      console.log(e);
                  }}
              >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.name}</h4>
                <label>Review</label>
                <p className="desc">{p.description}</p>
                <label>Rating</label>
                <div className="stars">
                  {[...Array(parseInt(p.rating))].map(()=><Star className="star" />
)}
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
                  closeButton={false}
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
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setStar(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <label>Division</label>
                <select onChange={(e) => setDivision(e.target.value)}>
                  <option value='Choose Division'>Choose Division</option>
                  <option value='Dhaka'>Dhaka</option>
                  <option value='Rajshahi'>Rajshahi</option>
                  <option value='Chittagong'>Chittagong</option>
                  <option value='Barisal'>Barisal</option>
                  <option value='Khulna'>Khulna</option>
                  <option value='Sylhet'>Sylhet</option>
                  <option value='Rangpur'>Rangpur</option>
                </select>
                <label>Type</label>
                <select onChange={(e) => {setType(e.target.value);addImageURLbasedOnType(type);}}>
                  <option value='Choose Type'>Choose Type</option>
                  <option value='Historic'>Historic Place</option>
                  <option value='Beach'>Beach</option>
                  <option value='Mountain'>Mountain</option>
                  <option value='Amusement'>Amusement Park</option>
                  <option value='Restaurant'>Restaurant</option>
                  <option value='Hotel'>Hotel</option>
                  <option value='Forest'>Forest</option>
                  <option value='Park'>Park</option>
                  <option value='Other'>Other</option>
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