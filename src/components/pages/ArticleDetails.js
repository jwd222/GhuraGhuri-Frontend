import React from "react";
import { useState } from "react";
import '../../App.js';
import { useEffect} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { createBrowserHistory } from 'history';
import './ArticleDetails.css'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";



function ArticleDetails(){
    const history = createBrowserHistory({forceRefresh:true});
    const id = localStorage.getItem('articleID');
    const [userid, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [like, setLike] = useState("");
    const [dislike, setDislike] = useState("");
    const [name, setName] = useState("");
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        getArticleInfo();
        getUserName();
      }, []);

      const updateUser=()=>
    {   setLike(like+1);
        const article={userid, title, description, like, dislike, imageURL};
        console.log(article);
        fetch("http://localhost:8081/article/updateLike", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(article)
        }).then(()=>{
            console.log("article updated");
          }
        )

    }
    
      const getArticleInfo = () => {
        fetch('http://localhost:8081/article/getById/id?id='+id, {
        }).then(response => response.json())
        .then(data => {
          console.log(data);
          setTitle(data[0].title);
          setDescription(data[0].description);
          setLike(data[0].like);
          setDislike(data[0].dislike);
          setUserId(data[0].userid);
          setImageURL(data[0].imageURL);
        })
      };

      const getUserName = () => {
        fetch('http://localhost:8081/user/getById/id?id='+userid, {
        }).then(response => response.json())
        .then(data => {
          console.log(data);
          setName(data[0].name);
        })
      };

    return(
        <div className="backgroundcontainer">
        <Col className="profilecontainer" style={{ alignItems: "center" }}>
          <h1 style={{ fontSize: 36, fontFamily: "Times New Roman", fontWeight: "bold", marginBottom: "10px" }}>{title}</h1>
          <h1 style={{ fontSize: 16, fontFamily: "Times New Roman", fontWeight: "bold", marginTop: "10px", color: "#222F6E" }}>{name}</h1>
          <Col>
            <Row>
              <br></br>
              <p style={{ fontSize: 18, fontFamily: "Times New Roman" }}>______________________________________________________________________</p>
            </Row>
            <Row>
              <img src={imageURL} label="Article_image" style={{ width: "100%", height: "100%" }}></img>
            </Row>
            <Row>
              <h3 style={{ fontSize: 14, fontFamily: "Times New Roman", fontWeight: "400", marginTop: "10px" }}>{description}</h3>
            </Row>
            <Row style={{fontSize: 18, fontFamily: "Times New Roman",  margin: "20px"}}>
              <Col style={{margin: "20px"}}><h4 style={{fontSize: 18, fontFamily: "Times New Roman", color: "#222F6E"}}><FaThumbsUp onClick={updateUser}/> {like}</h4></Col>
              <Col style={{marginLeft: "40px", marginTop: "20px"}}><h4  style={{fontSize: 18, fontFamily: "Times New Roman", color: "#222F6E"}}><FaThumbsDown onClick={updateUser}/> {dislike} </h4></Col>
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

export default ArticleDetails