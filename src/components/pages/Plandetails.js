import "./Plandetails.css";
import '../../App.js';
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function Plandetails(props) {
  const email = localStorage.getItem('email');
  const id =  localStorage.getItem('planId');
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [description, setDescription] = useState("");

  const updatePlan = (e) => { //e.preventDefault();
    const plan = {id, name, email, description };
    console.log(plan);
    fetch("http://localhost:8081/plan/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan)
    }).then(() => { console.log("Plan updated") })
  }

  useEffect(() => {
    getPlan();
}, []);

const handleSubmit = e => {
    e.preventDefault();
  }

const getPlan = () => {
    fetch('http://localhost:8081/plan/getById/id?id=' + id, {
    }).then(response => response.json())
      .then(data => {
            console.log(data);
            setName(data[0].name);
            setDescription(data[0].description);
      })
  };

  return (
    <div class="column">
      <div class="profilecontainer">
        <Form onSubmit={(e) => {
          handleSubmit(e);
          updatePlan();
        }}>

          <h2>{name}</h2>

          <Form.Group controlId="name">
            <Form.Control style={{ fontSize: 14, fontFamily: "Times New Roman", height: "30px", width: "500px", backgroundColor: "#E7E2E2" }}
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <p>{description}</p>

          <Form.Group controlId="description">
            <Form.Control style={{ fontSize: 14, fontFamily: "Times New Roman", height: "30px", width: "500px", backgroundColor: "#E7E2E2" }}
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          
          <Button type="submit" style={{ height: "30px", width: "200px", backgroundColor: "white", fontSize: 16, fontFamily: "Times New Roman", fontWeight: "bold", backgroundColor: "#E7E2E2", marginTop: "30px" }}>
            Update Plan
          </Button>
        </Form>

        <br/>
          <span><a href='/addplanfriends'>Add friends</a></span><br/>
          <br/>
          <span><a href='/addplanlocations'>Add locations</a></span><br/>
          <br/>
          <span><a href='/addnotes'>Add notes</a></span><br/>
          <br/>
      </div>
    </div>
  );

}

export default Plandetails