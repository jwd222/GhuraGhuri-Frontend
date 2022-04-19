import "./Profile.css";
import '../../App.js';
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from 'react-router-dom';

function Profile(props) {
  const email = localStorage.getItem('email');
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    fetch('http://localhost:8081/user/getByMail/mail?mail=' + email, {
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setName(data[0].name);
        setMail(data[0].email);
        setAddress(data[0].address);
        setArea(data[0].area);
      })
  };

  const updateUser=(e)=>
    { e.preventDefault();
        const user={name, email, password, area, address};
        console.log(user);
        fetch("http://localhost:8081/user/update/mail?mail=" + email, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>{console.log("User updated")})

    }


  return (
    <div class="row">
      <div class="column">
        <div class="profilecontainer">
          <img src="http://media.idownloadblog.com/wp-content/uploads/2012/04/Phil-Schiller-headshot-e1362692403868.jpg" height="150" width="150" />
          <h2>{name}</h2>
          <h4>{email}</h4>
          <p>{address}</p>
        </div>
      </div>
      <div class="column">
        <div class="profilecontainer">
          <img src="http://media.idownloadblog.com/wp-content/uploads/2012/04/Phil-Schiller-headshot-e1362692403868.jpg" height="150" width="150" />
          <Form action='/' method="POST" onSubmit={(e) => {
            updateUser(e);
          }}>

          <Form.Group controlId="name">
            <Row>
              <Form.Control style={{ fontSize: 14, fontFamily: "Times New Roman", height: "30px", width: "700px", backgroundColor: "#E7E2E2" }}
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Row>
          </Form.Group>

          <Form.Group controlId="address">
            <Row>
              <Form.Control style={{ fontSize: 14, fontFamily: "Times New Roman", height: "30px", width: "700px", backgroundColor: "#E7E2E2" }}
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Row>
          </Form.Group>

          <Row>
            <Button type="submit">
              Update
            </Button>
          </Row>
          
          </Form>

        </div>
      </div>
    </div>
  );

}

export default Profile