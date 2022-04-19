import "./Myplans.css";
import '../../App.js';
import CardItem from '../CardItem'
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from 'react-router-dom';

function Myplans(props) {
    const email = localStorage.getItem('email');
    const [listOfPlans, setPlans] = useState([]);

    useEffect(() => {
        getAllPlans();
    }, []);

    const getAllPlans = () => {
        fetch('http://localhost:8081/plan/getByMail/mail?mail=' + email, {
        }).then(response => response.json())
          .then(data => {
            setPlans(data);
                console.log(data);
          })
      };

    return (
        <div className="Myplans">
            <h1 className="alllocation">My Plans</h1>

            <span><a href='/addplan'>Create new plan</a></span>

            {listOfPlans.map((values, key) => {
                return (
                    <div className='cards__container_plans'>
                        <div className='cards__wrapper' >
                            <ul className='cards__item'
                                onClick={() => {
                                    localStorage.setItem('planId', values.id);
                                }}>
                                <CardItem
                                    text={values.name}
                                    path='/plandetails'
                                />
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    );

}

export default Myplans