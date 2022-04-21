import "./Profile.css";
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function Profile(props) {
  const history = createBrowserHistory({forceRefresh:true});
  const email = localStorage.getItem('email');
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");

  const updateUser = (e) => { //e.preventDefault();
    const user = { name, email, password, area, address };
    console.log(user);
    fetch("http://localhost:8081/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(() => { console.log("User updated");
    history.push({
      pathname: '/profile'
    }); })

  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  }

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

  return (
    <div class="column">
      <div class="profilecontainer">

        <Form onSubmit={(e) => {
          handleSubmit(e);
          updateUser();
        }}>

          <Form.Group controlId="image">
            <img src="https://www.washingtonpost.com/graphics/2019/lifestyle/travel/instagram-travel-influencers/img/grid/1.jpg" height="150" width="150" />
          </Form.Group>

          <h2>{name}</h2>

          <Form.Group controlId="name">
            <Form.Control style={{ fontSize: 14, fontFamily: "Times New Roman", height: "30px", width: "500px", backgroundColor: "#E7E2E2" }}
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <h4>{email}</h4>

          <p>{address}</p>

          <Form.Group controlId="address">
            <Form.Control style={{ fontSize: 14, fontFamily: "Times New Roman", height: "30px", width: "500px", backgroundColor: "#E7E2E2" }}
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="updatebtn">
            <Button type="submit" style={{ height: "30px", width: "200px", backgroundColor: "white", fontSize: 16, fontFamily: "Times New Roman", fontWeight: "bold", backgroundColor: "#E7E2E2", marginTop: "30px" }}>
              Update Profile
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );

}

export default Profile