import React from 'react'
import '../../App.css'
import { useEffect, useState } from "react";
import CardItem from '../CardItem'
import HeroSection from '../HeroSection'
import { Link, useHistory } from "react-router-dom";

function Home_wo_Login() {
  const [listOfArticles, setArticle] = useState([]);
  let history = useHistory();

  const getTopArticle = () => {
    fetch('http://localhost:8081/article/getTopArticles', {
    }).then(response => response.json())
      .then(data => {
        setArticle(data);
        console.log(data);
      })
  };

  useEffect(() => {
    getTopArticle();
  }, []);
  return (
    <>
      <div>
        <HeroSection />
      </div>
      <div className="homebody">
        <h1>Trending</h1>
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
      </div>
    </>
  )
}

export default Home_wo_Login