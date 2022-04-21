import React from 'react'
import './Home.css'
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import { createBrowserHistory } from 'history';
import CardItem from '../CardItem'
import axios from 'axios';


function Home() {
  const history = createBrowserHistory({ forceRefresh: true });
  const [userid, setID] = useState("");
  const [listOfArticles, setArticle] = useState([]);
  //const [listOfNotices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const like = 0;
  const dislike = 0;
  const imageURL = "";
  const [modal, setModal] = useState(false);
  const [pins, setPins] = useState([]);
  const getPins = async () => {
    try {
      const allPins = await axios.get("http://localhost:8081/location/getAll");
      setPins(allPins.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setID(localStorage.getItem('currentID'));
    getTopArticle();
    getPins();

  }, []);
  console.log(pins[0]);

  const handleSubmit = e => {
    e.preventDefault();
  }

  const addPost = () => {
    setID(localStorage.getItem('currentID'));
    const article = { userid, title, description, like, dislike, imageURL };
    console.log(article);
    fetch("http://localhost:8081/article/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    }).then(() => {
      console.log("New article added");
      setTitle("");
      setDescription("");
      history.push({
        pathname: '/home',
      });
    })
  }

  //get default browser location
  var opt = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
  };
  function success(pos) {
      var crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);        console.log(`More or less ${crd.accuracy} meters.`);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, opt);
  

  const getTopArticle = () => {
    fetch('http://localhost:8081/article/getTopArticles', {
    }).then(response => response.json())
      .then(data => {
        setArticle(data);
        console.log(data);
      })
  };

  const toggleModal = () => {
    setModal(!modal);
  };


  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  function logOut() {
    localStorage.setItem('currentID', '');
    history.push({
      pathname: '/login',
    });
  }


  return (
    <div className='HomeContainer'>
      <div className="header">
        <div className="leftside">
           <span ><a href='/myplans'> My Plans</a></span><br /><br />
           <span ><a href='/myarticles'> My Posts</a></span><br /><br />
           <span ><a href='/profile'> Profile</a></span><br /><br />
          <span ><a href='/map'>Add Place</a></span>
          <span > <button onClick={toggleModal} className="btn-modal">
            Log Out
          </button></span>
        </div>
        <div className="rightside">
          <form className='postform' id='postform' onSubmit={(e) => {
            handleSubmit(e);
            addPost();
          }}>
            <h1>
              Post articles here!
            </h1>
            <div className='postinputs'>
              <input id='title' type='text'
                name='title'
                className='postinput'
                value={title}
                placeholder='Enter a title for the post'
                onChange={(e) => {
                  const selectedState = e.target.value;
                  setTitle(selectedState);
                }}></input>
            </div>
            <div className='postinputs'>
              <textarea rows="10" cols="100" className='postdetails'
                name="details" form="postform" value={description} placeholder="Enter detailes here" onChange={(e) => {
                  const selectedState = e.target.value;
                  setDescription(selectedState);
                }}></textarea>
            </div>
            <button className='postbtn'>POST</button>
          </form>
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h2>Log Out</h2>
                <p>
                  Are you sure you want to log out?
                </p>
                <button className="close-modal" onClick={toggleModal}>
                  X
                </button>
                <button className="no-modal" onClick={toggleModal}>
                  NO
                </button>
                <button className="yes-modal" onClick={logOut}>
                  YES
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="homebody">
        <h1>Recent Articles</h1>
        {listOfArticles.map((values, key) => {
          return (
            <div className='cards__container_uni'>
              <div className='cards__wrapper'>
                <ul className='cards__items_uni'
                  onClick={() => {
                    localStorage.setItem('articleID', values.id);
                  }}>
                  <CardItem
                    src={values.imageURL}
                    text={values.title}
                    label='Article_preview'
                    path='/articledetails' />
                </ul>
              </div>
            </div>
          )
        })}
        <br />
        <div><button className='morebtn' onClick={(e) => { history.push({ pathname: '/allarticles' }); }}>See more Articles</button></div>
      </div>
    </div>
  )
}

export default Home