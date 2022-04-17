import React from 'react'
import './Home.css'
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import { createBrowserHistory } from 'history';


function Home() {
    const history = createBrowserHistory({forceRefresh:true});
    //const [listOfNotices, setNotices] = useState([]);
    const [title, setTitle] = useState("");
    const [details, setDeatils] = useState("");
    const [modal, setModal] = useState(false);
  
    useEffect(() => {
      
    }, []);
  
  
    const handleSubmit = e => {
      e.preventDefault();
    }
  
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
            <span ><Link to={{ pathname: "/myplans" }}>My Plans</Link></span><br /><br />
            <span ><Link to={{ pathname: "/myarticles" }}>My Posts</Link></span><br /><br />
            <span ><Link to={{ pathname: "/profile" }}>Profile</Link></span>
            <span > <button onClick={toggleModal} className="btn-modal">
              Log Out
            </button></span>
          </div>
          <div className="rightside">
            <form className='postform' id='postform' onSubmit={(e) => {
              handleSubmit(e);
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
                  name="details" form="postform" value={details} placeholder="Enter detailes here" onChange={(e) => {
                    const selectedState = e.target.value;
                    setDeatils(selectedState);
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
         
        </div>
      </div>
    )
  }

export default Home