import "./Plandetails.css";
import '../../App.js';
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CardItem from '../CardItem'
import { FaTrash } from "react-icons/fa";

function Plandetails() {
  const history = createBrowserHistory({ forceRefresh: true });
  const email = localStorage.getItem('email');
  const id = localStorage.getItem('planId');
  const [noteplanid, setNotePlanId] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [description, setDescription] = useState("");
  const [listOfNotes, setNote] = useState([]);
  const [notedescription, setNoteDescription] = useState("");
  const [listOfPlanLocations, setPlanLocation] = useState([]);
  const [listOfLocations, setLocation] = useState([]);

  useEffect(() => {
    setNotePlanId(id);
    getPlan();
    getNote();
    getPlanLocation();
    getAllLocation();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  }

  const updatePlan = (e) => { //e.preventDefault();
    const plan = { id, name, email, description };
    console.log(plan);
    fetch("http://localhost:8081/plan/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan)
    }).then(() => {
      console.log("Plan updated");
      history.push({
        pathname: '/plandetails'
      });
    })
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

  const deletePlan = () => {
    const plan = { id, name, email, description };
    console.log(plan);
    fetch("http://localhost:8081/plan/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan)
    }).then(() => {
      console.log("plandeleted");
      history.push({
        pathname: '/myplans'
      });
    }
    )
  };

  const getNote = () => {
    fetch('http://localhost:8081/note/getByPlanId/planId?planId=' + id, {
    }).then(response => response.json())
      .then(data => {
        setNote(data);
        console.log(data);
      })
  };

  const getPlanLocation = () => {
    fetch('http://localhost:8081/planLocation/getByPlanId/planId?planId=' + id, {
    }).then(response => response.json())
      .then(data => {
        setPlanLocation(data);
        console.log(data);
      })
  };

  const getAllLocation = () => {
    fetch('http://localhost:8081/location/getAll', {
    }).then(response => response.json())
      .then(data => {
        setLocation(data);
        console.log(data);
      })
  };

  const addNote = (f) => {
    f.preventDefault();
    const note = { planId: id, description: notedescription };
    console.log(note);
    fetch("http://localhost:8081/note/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note)
    }).then(() => {
      console.log("New note added");
      setNoteDescription("");
      localStorage.setItem('planId', id);
      history.push({
        pathname: '/plandetails'
      });
    })
  }

  return (
    <div>
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

            <Form.Group controlId="updatebtn">
              <Button type="submit" style={{ height: "30px", width: "200px", backgroundColor: "white", fontSize: 16, fontFamily: "Times New Roman", fontWeight: "bold", backgroundColor: "#E7E2E2", marginTop: "30px" }}>
                Update Plan
              </Button>
            </Form.Group>

            <Form.Group controlId="deletebtn" style={{ fontSize: 18, fontFamily: "Times New Roman", margin: "20px" }}>
              <Col style={{ marginTop: "20px" }}><h4 style={{ fontSize: 18, fontFamily: "Times New Roman", color: "#222F6E" }}><FaTrash onClick={deletePlan} /></h4></Col>
            </Form.Group>

          </Form>

          <br />
          <span><a href='/planlocation'>Add locations</a></span><br />
          <br />

          <br />
          <h3><u1>Locations</u1></h3>

          <div>
          {Object.entries(listOfPlanLocations).map(([values, key]) => {
              return (
                <div>
                  <p>{key.locationName}</p>
                </div>

              )
            })}
          </div>

        </div>
      </div>

      <div class="column">
        <div class="profilecontainer">

          <Form onSubmit={(f) => {
            handleSubmit(f);
            setNotePlanId(id);
            addNote(f);
          }}>

            <Form.Group controlId="notedescription">
              <Form.Control style={{ fontSize: 14, fontFamily: "Times New Roman", height: "30px", width: "500px", backgroundColor: "#E7E2E2" }}
                type="text"
                placeholder="Write Note"
                value={notedescription}
                onChange={(f) => {
                  setNotePlanId(id);
                  setNoteDescription(f.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="addbtn">
              <Button type="submit" style={{ height: "30px", width: "200px", backgroundColor: "white", fontSize: 16, fontFamily: "Times New Roman", fontWeight: "bold", backgroundColor: "#E7E2E2", marginTop: "30px" }}>
                Add Note
              </Button>
            </Form.Group>

          </Form>

          <br />
          <h3><u1>Notes</u1></h3>

          <div>
            {Object.entries(listOfNotes).map(([values, key]) => {
              return (
                <div>
                  <p>{key.description}</p>
                </div>
              )
            })}
          </div>

        </div>
      </div>

    </div>
  );

}

export default Plandetails