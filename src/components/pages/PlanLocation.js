import '../../App.js';
import React, { useEffect, useState } from "react";
import CardItem from '../CardItem'
import { createBrowserHistory } from 'history';


function PlanLocation() {
    const history = createBrowserHistory({ forceRefresh: true });
    const [listOfLocation, setLocation] = useState([]);
    const [name, setName] = useState("");
    const planid = localStorage.getItem('planId');
    const [locationid, setLocationId] = useState("");
    const [locationname, setLocationName] = useState("");

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
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    const addPlanLocation = (e) => { //e.preventDefault();
        const locationid = localStorage.getItem('planLocationId');
        const locationname = localStorage.getItem('planLocationName');
        const planLocation = { planId: planid, locationId: locationid, locationName: locationname};
        fetch("http://localhost:8081/planLocation/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(planLocation)
        }).then(() => {
            console.log("New plan location added");
            console.log(planLocation);
            //console.log(locationname);
            history.push({
                pathname: '/plandetails'
            });
        })
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
            {Object.entries(listOfLocation).map(([values, key]) => {
                return (
                    <div className='cards__container_location'>
                        <div className='cards__wrapper' >
                            <ul className='cards__items_loc'
                                onClick={() => {
                                    localStorage.setItem('planLocationId', key.id);
                                    localStorage.setItem('planLocationName', key.name);
                                    setLocationId(key.id);
                                    setLocationName(key.name);
                                    addPlanLocation();
                                }}>
                                <CardItem
                                    src={key.imageURL}
                                    text={key.name}
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