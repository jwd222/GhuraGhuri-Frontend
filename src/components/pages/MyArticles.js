import React from "react";
import { useState } from "react";
import '../../App.js';
import { useEffect} from "react";
import { createBrowserHistory } from 'history';
import CardItem from '../CardItem'
import './AllArticle.css'


function MyArticles(){
    const userid = localStorage.getItem('currentID');
    const [listOfArticles, setArticle] = useState([]);

    useEffect(() => {
        getMyArticle();
        }, []);

    const getMyArticle = () => {
        fetch('http://localhost:8081/article/getByUserId/userid?userid='+userid, {
        }).then(response => response.json())
            .then(data => {
                setArticle(data);
                console.log(data);
            })
    };
    return(
    <div>
        <h1>My Articles</h1>
        <div>
        {Object.entries(listOfArticles).map(([values, key]) => {
          return (
            <div className='cards__container_uni'>
              <div className='cards__wrapper'>
                <ul className='cards__items_uni'
                  onClick={() => {
                    localStorage.setItem('articleID', key.id);
                  }}>
                  <CardItem
                    src={key.imageURL}
                    text={key.title}
                    label='Article_preview'
                    path='/myarticledetails' />
                </ul>
              </div>
            </div>
          )
        })}
        </div>
        </div>
    )
}

export default MyArticles