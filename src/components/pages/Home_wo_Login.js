import React from 'react'
import '../../App.css'
import { useState } from "react";
import CardItem from '../CardItem'
import HeroSection from '../HeroSection'
import { Link, useHistory } from "react-router-dom";

function Home_wo_Login() {
    const [listOfTrending, setTrending] = useState([]);
    let history = useHistory();

    /*const getTrending = () => {
        Axios.post('http://localhost:3001/getTrending', {
        }).then((response) => {
          setNotices(response.data);
          //console(response.data);
        })
      };*/
  return (
    <>
    <div>
    <HeroSection/>
    </div>
      <div className="homebody">
        <h1>Trending</h1>
        {listOfTrending.map((values, key) => {
          return (
            <div className='cards__container_uni'>
              <div className='cards__wrapper'>
                <ul className='cards__items_uni'
                  onClick={() => {
                   /* localStorage.setItem('noticeID', values.ID);*/
                  }}>
                  <CardItem
                    /*src={values.imageURL}
                    text={values.Title}
                    label='Post_Image'
                   /* path='/noticedetails' *//>
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home_wo_Login