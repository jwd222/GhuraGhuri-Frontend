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
  const [listOfPlaces, setListOfPlaces] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const like = 0;
  const dislike = 0;
  const imageURL = "https://feelforhair.co.uk/wp-content/uploads/2017/12/default-post-thumbnail.png";
  const [modal, setModal] = useState(false);
  const [pinData, setPinData] = useState([]);
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLng, setCurrentLng] = useState(null);
  const getPinData = async () => {
    try {
      const allPins = await axios.get("http://localhost:8081/location/getAll");
      setPinData(allPins.data);
    } catch (err) {
      console.log(err);
    }
  };
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  }

  useEffect(() => {
    setID(localStorage.getItem('currentID'));
    getTopArticle();
    getPinData();
  }, []);

  /* 
    const data = pinData.map(coordinate => ({
      id: coordinate.id,
      distnace: calculateDistance(currentLat, currentLng, coordinate.lat, coordinate.lng)
    }));
    console.log(data) */

  useEffect(() => {
    setListOfPlaces(pinData.filter(coordinate => {
      // console.log("useEffect", pinData, listOfPlaces)
      return calculateDistance(currentLat, currentLng, coordinate.lat, coordinate.lng) <= 10000
    }))
  }, [pinData]);

  console.log(pinData);

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
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    setCurrentLat(pos.coords.latitude);
    setCurrentLng(pos.coords.longitude);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
  /* console.log(`Currennt latitude is: ${currentLat}`);
  console.log(`Currennt longitude is: ${currentLng}`);
  console.log(pinData) */


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
            <div className='cards__container_location'>
              <div className='cards__wrapper' >
                <ul className='cards__items_loc'
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
        <h1>Places Nearby</h1>
        {listOfPlaces.map((places, key) => {
          console.log("From article", places)
          return (
            <div className='cards__container_location'>
              <div className='cards__wrapper' >
                <ul className='cards__items_loc'
                  onClick={() => {
                    localStorage.setItem('locationID', places.id);
                  }}>
                  <CardItem
                    src={places.imageURL}
                    text={places.name}
                    label='location_preview'
                    path='/locationdetails' />
                </ul>
              </div>
            </div>
          )
        })}
        <br />
      </div>
    </div>
  )
}

export default Home