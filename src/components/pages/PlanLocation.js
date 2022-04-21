import '../../App.js';
import React, { useEffect, useState } from "react";
import CardItem from '../CardItem'
import { createBrowserHistory } from 'history';


function PlanLocation() {
    const [listOfLocation, setLocation] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        getAllLocation();
    }, []);

    const getAllLocation = () => {
        fetch('http://localhost:8081/location/getAll', {
        }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
    };

    const getByName = () => {
        fetch('http://localhost:8081/location/discoverSearchName/name?name=' + name, {
        }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
    };

    const HandleSearch = (name) => {
       if (name !== "") {
            getByName();
        }}

        const handleSubmit = e => {
            e.preventDefault();
        }
 
  return (
    <div>
     <h1 className="alllocation">All Locations</h1>

<div className='searchbar' >
    <form className='searchform' onSubmit={(e) => {
        //handleSubmit(e);
    }}>
        <input type="text"
            placeholder="Search"
            onChange={e => {
                const selectedState = e.target.value;
                setName(selectedState);
                HandleSearch(selectedState);
            }}
        />
    </form>
</div>
{listOfLocation.map((values, key) => {
          return (
            <div >
              <div >
                <ul 
                  onClick={() => {
                    localStorage.setItem('articleID', values.id);
                  }}>
                  <input className='locationplan'
                    type="radio"
                    value={values.name}
                   >{values.name}</input>
                </ul>
              </div>
            </div>
          )
        })}
            </div>
  );

}
export default PlanLocation