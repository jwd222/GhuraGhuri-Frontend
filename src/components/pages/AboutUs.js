import React from "react";
import '../../App.css';
import { Row, Col } from "react-bootstrap";

export default function AboutUs() {
    return (
        <div className="backgroundcontainer">
        <Col className="profilecontainer" style={{ alignItems: "center" }}>
          <h1 style={{ fontSize: 36, fontFamily: "Times New Roman", fontWeight: "bold", marginBottom: "10px" }}>About us</h1>
          <Col>
            <Row>
              <br></br>
              <p style={{ fontSize: 18, fontFamily: "Times New Roman" }}>______________________________________________________________________</p>
            </Row>
            <Row>
              <p style={{ fontSize: 18, fontFamily: "Times New Roman", fontWeight: "600", marginTop: "10px" }}>How to use</p>
            </Row>
            <Row>
              <h3 style={{ fontSize: 14, fontFamily: "Times New Roman", fontWeight: "400", marginTop: "10px" }}>This website was built for travel enthusiasts which will help them as a 
              travel guide specially for the areas in Bangladesh. With the help of GhuraGhuri, travellers will be able to find 
              hidden gems as it shows proper reviews and ratings for places. Users can also add places they have visited through this website.
              </h3>
            </Row>
            <Row>
              <p style={{ fontSize: 18, fontFamily: "Times New Roman", fontWeight: "600", marginTop: "10px" }}>About autohrs</p>
            </Row>
            <Row>
              <h3 style={{ fontSize: 14, fontFamily: "Times New Roman", fontWeight: "400", marginTop: "10px" }}>This website is built by TasFarNujSam with love and care. Feel
              free to mail any complaints at tasfarnuj@gmail.com. Happy surfing.</h3>
            </Row>
          </Col>
        </Col>
      </div>
    );
}