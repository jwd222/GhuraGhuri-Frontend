import React from "react";
import { useState } from "react";
import '../../App.js';
import { useEffect} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { createBrowserHistory } from 'history';
import './ArticleDetails.css'
import { FaStar } from "react-icons/fa";


function LocationDetails(){
    const id=localStorage.getItem('locationID');
    const [rating, setRating] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [division, setDivision] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [type, setType] = useState("");
    const [username, setUserName] = useState("");
    
    const getLocationInfo = () => {
        fetch('http://localhost:8081/location/getById/id?id='+id, {
        }).then(response => response.json())
        .then(data => {
          console.log(data);
          setRating(data[0].rating);
          setDescription(data[0].description);
          setName(data[0].name);
          setDivision(data[0].division);
          setLat(data[0].lat);
          setLng(data[0].lng);
          setType(data[0].type);
          setUserName(data[0].username);
          setImageURL(data[0].imageURL);
        }).then(
          console.log("location fetched")
          );
      };

      useEffect(() => {
        console.log(id);
        getLocationInfo();
      }, []);

    return(
        <div className="backgroundcontainer">
        <Col className="profilecontainer" style={{ alignItems: "center" }}>
          <h1 style={{ fontSize: 36, fontFamily: "Times New Roman", fontWeight: "bold", marginBottom: "10px" }}>{name}</h1>
          <h1 style={{ fontSize: 20, fontFamily: "Times New Roman", fontWeight: "bold", marginTop: "10px", color: "#222F6E" }}>{division}</h1>
          <h1 style={{ fontSize: 18, fontFamily: "Times New Roman", fontWeight: "bold", marginTop: "10px", color: "#222F6E" }}>{type}</h1>
          <Col>
            <Row>
              <br></br>
              <p style={{ fontSize: 18, fontFamily: "Times New Roman" }}>______________________________________________________________________</p>
            </Row>
            <Row>
              <img src={imageURL} label="location_image" style={{ width: "100%", height: "100%" }}></img>
            </Row>
            <Row>
              <h3 style={{ fontSize: 18, fontFamily: "Times New Roman", fontWeight: "400", marginTop: "10px" }}>{description}</h3>
            </Row>
            <Row style={{fontSize: 18, fontFamily: "Times New Roman",  margin: "20px"}}>
              <Col style={{margin: "20px"}}><h4 style={{fontSize: 18, fontFamily: "Times New Roman", color: "#222F6E"}}><FaStar color="#f0ab0a"/> {rating}</h4></Col>
            </Row>
            <Row style={{fontSize: 14, fontFamily: "Times New Roman",  margin: "20px"}}>
              <Col style={{margin: "20px"}}><h4 style={{fontSize: 18, fontFamily: "Times New Roman", color: "#222F6E"}}>Added by {username}</h4></Col>
            </Row>
            <Row>
              <p style={{ fontSize: 18, fontFamily: "Times New Roman" }}>______________________________________________________________________</p>
              <br></br>
            </Row>
          </Col>
        </Col>
      </div>
    )
}

export default LocationDetails