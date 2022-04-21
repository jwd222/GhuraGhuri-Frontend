import '../../App.js';
import React, { useEffect, useState } from "react";
import CardItem from '../CardItem'
import { createBrowserHistory } from 'history';


function PlanLocation() {
    const [listOfLocation, setLocation] = useState([]);
    const [name, setName] = useState("");
    const planid = localStorage.getItem('planId');

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
            <div className='cards__container_uni'>
              <div className='cards__wrapper'>
                <ul className='cards__items_uni'
                  onClick={() => {
                      console.log(planid)
                    const note = { planid: planid, locationid: values.id, locationname: values.name };
                    fetch("http://localhost:8081//test/addtest", {
                     method: "POST",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify(note)
                     }).then(() => {
                     console.log("New location added"); })
                  }}>
                  <CardItem
                    src={values.imageURL}
                    text={values.name}
                    label='Article_preview'
                    //path='/plandetails'
                     />
                </ul>
              </div>
            </div>
          )
        })}
            </div>
  );

}
export default PlanLocation