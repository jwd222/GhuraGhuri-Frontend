import React from 'react'
import '../../App.css'
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import './Addplan.css'
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CardItem from '../CardItem'


function Addplan() {
  const history = createBrowserHistory({ forceRefresh: true });
  const email = localStorage.getItem('email');
  const [id, setId] = useState("");
  const i = 0;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const getAllPlans = () => {
    fetch('http://localhost:8081/plan/getAll=' + email, {
    }).then(response => response.json())
      .then(data => {
        while (data) i++;
        setId(i);
        console.log(data);
      })
  };

  const addPlan = (e) => { //e.preventDefault();
    const plan = { id, name, email, description };
    console.log(plan);
    fetch("http://localhost:8081/plan/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan)
    }).then(() => {
      console.log("New Plan added");
      history.push({
        pathname: '/myplans'
      });
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div class="column">
      <div class="profilecontainer">
        <Form onSubmit={(e) => {
          handleSubmit(e);
          addPlan();
        }}>

          <Form.Group controlId="name">
            <Form.Control style={{ fontSize: 14, fontFamily: "Times New Roman", height: "30px", width: "500px", backgroundColor: "#E7E2E2" }}
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Control style={{ fontSize: 14, fontFamily: "Times New Roman", height: "30px", width: "500px", backgroundColor: "#E7E2E2", marginTop: "30px" }}
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="addplanbtn">
            <Button type="submit" style={{ height: "30px", width: "200px", backgroundColor: "white", fontSize: 16, fontFamily: "Times New Roman", fontWeight: "bold", backgroundColor: "#E7E2E2", marginTop: "30px" }}>
              Add Plan
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Addplan