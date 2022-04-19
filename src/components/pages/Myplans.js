import "./Myplans.css";
import '../../App.js';
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from 'react-router-dom';

function Myplans(props) {
    return (
        <div class="planscard">
            <img src="img_avatar.png" alt="Avatar" style="width:100%" />
            <div class="planscontainer">
                <h4><b>plan1</b></h4>
                <p>details</p>
            </div>
        </div>
    );

}

export default Myplans