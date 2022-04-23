import React from "react";
import { useState } from "react";
import '../../App.js';
import { useEffect } from "react";
import { createBrowserHistory } from 'history';
import CardItem from '../CardItem'
import './AllArticle.css'


function AllArticle() {

  const [listOfArticles, setArticle] = useState([]);

  useEffect(() => {
    getAllArticle();
  }, []);

  const getAllArticle = () => {
    fetch('http://localhost:8081/article/getAllArticles', {
    }).then(response => response.json())
      .then(data => {
        setArticle(data);
        console.log(data);
      })
  };
  return (
    <div>
      <h1>All Articles</h1>
      <div>
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
    </div>
  )
}

export default AllArticle