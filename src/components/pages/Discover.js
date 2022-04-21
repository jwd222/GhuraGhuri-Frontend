import '../../App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, useHistory, Route } from 'react-router-dom';
import CardItem from '../CardItem'
import './Discover.css'
import { Button } from 'react-bootstrap';

function Discover() {
    const [listOfLocation, setLocation] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [division, setDivision] = useState("");
    const [type, setType] = useState("");
    const [click, setClick] = useState(false);

    const HandleClick = () => {
        //e.preventDefault();
        setClick(!click);
        if (click === false) {
            HandleSearchAll(name, division, type);
        }
        else {
            HandleSearchAllUp(name, division, type);
        }
    }

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

    const getAllLocationSortDown = () => {
        fetch('http://localhost:8081/location/sortDown', {
        }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
    };
    const getAllLocationSortUp = () => {
        fetch('http://localhost:8081/location/sortUp', {
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
    const getByNameUp = () => {
        fetch('http://localhost:8081/location/discoverSearchNameUp/name?name=' + name, {
        }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
    };


    const HandleSearchAll = (name, division, type) => {
        if (name === "" && (division === "" || division === "Choose Division") && (type === "" || type === "Choose Type")) {
            getAllLocationSortDown();
        }
        else if (name !== "" && (division === "" || division === "Choose Division") && (type === "" || type === "Choose Type")) {
            getByName();
        }
        else if (name === "" && (division !== "" && division !== "Choose Division") && (type === "" || type === "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchDivision/division?division=' + division, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name === "" && (division === "" || division === "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchType/type?type=' + type, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name !== "" && (division !== "" && division !== "Choose Division") && (type === "" || type === "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameDivision/namedivision?name=' + name + '&division=' + division, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name !== "" && (division === "" || division === "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameType/nametype?name=' + name + '&type=' + type, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name === "" && (division !== "" && division !== "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchDivisionType/divisiontype?division=' + division + '&type=' + type, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name !== "" && (division !== "" && division !== "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameDivisionType/namedivisiontype?name=' + name + '&division=' + division + '&type=' + type, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
    }

    const HandleSearchAllUp = (name, division, type) => {
        if (name === "" && (division === "" || division === "Choose Division") && (type === "" || type === "Choose Type")) {
            getAllLocationSortUp();
        }
        else if (name !== "" && (division === "" || division === "Choose Division") && (type === "" || type === "Choose Type")) {
            getByNameUp();
        }
        else if (name === "" && (division !== "" && division !== "Choose Division") && (type === "" || type === "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchDivisionUp/division?division=' + division, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name !== "" && (division !== "" && division !== "Choose Division") && (type === "" || type === "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameDivisionUp/namedivision?name=' + name + '&division=' + division, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name === "" && (division === "" || division === "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchTypeUp/type?type=' + type, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name !== "" && (division === "" || division === "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameTypeUp/nametype?name=' + name + '&type=' + type, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name === "" && (division !== "" && division !== "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchDivisionTypeUp/divisiontype?division=' + division + '&type=' + type, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
        else if (name !== "" && (division !== "" && division !== "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameDivisionTypeUp/namedivisiontype?name=' + name + '&division=' + division + '&type=' + type, {
            }).then(response => response.json())
                .then(data => {
                    setLocation(data);
                    console.log(data);
                })
        }
    }


    const handleSubmit = e => {
        e.preventDefault();
    }

    return (

        <div className="Discover">
            <h1 className="alllocation">All Locations</h1>

            <div className='searchbar' >
                <form className='searchform' onSubmit={(e) => {
                    //handleSubmit(e);
                }}>
                    <input type="text"
                        placeholder="Search"
                        onChange={e => {
                            //e.preventDefault();
                            const selectedState = e.target.value;
                            setName(selectedState);
                            HandleSearchAll(selectedState, division, type);
                        }}
                    />
                </form>
            </div>
            <div className='sortbutton' onClick={HandleClick}>
                <p>SORT</p>
                <i className={click ? 'fas fa-sort-up' : 'fas fa-sort-down'} />
            </div>
            <div className='selectdiv'>
                <select className="searchDivision"
                    onChange={(e) => {
                        //e.preventDefault();
                        const selectedState = e.target.value;
                        setLocation(selectedState);
                        HandleSearchAll(name, selectedState, type);
                    }}>
                    <option value='Choose Division'>Choose Division</option>
                    <option value='Dhaka'>Dhaka</option>
                    <option value='Rajshahi'>Rajshahi</option>
                    <option value='Chittagong'>Chittagong</option>
                    <option value='Barisal'>Barisal</option>
                    <option value='Khulna'>Khulna</option>
                    <option value='Sylhet'>Sylhet</option>
                    <option value='Rangpur'>Rangpur</option>
                </select>
            </div>

            <div className='selecttype'>
                <select className="searchType"
                    onChange={(e) => {
                        //e.preventDefault();
                        const selectedState = e.target.value;
                        setType(selectedState);
                        HandleSearchAll(name, division, selectedState);
                    }}>
                    <option value='Choose Type'>Choose Type</option>
                    <option value='Historic'>Historic Place</option>
                    <option value='Beach'>Beach</option>
                    <option value='Mountain'>Mountain</option>
                    <option value='Amusement'>Amusement Park</option>
                    <option value='Restaurant'>Restaurant</option>
                    <option value='Hotel'>Hotel</option>
                    <option value='Forest'>Forest</option>
                    <option value='Park'>Park</option>
                    <option value='Other'>Other</option>
                </select>
            </div>

            {Object.entries(listOfLocation).map(([values, key]) => {
                return (
                    <div className='cards__container_location'>
                        <div className='cards__wrapper' >
                            <ul className='cards__items_loc'
                                onClick={() => {
                                     localStorage.setItem('locationID', key.id);
                                }}>
                                <CardItem
                                    src={key.imageURL}
                                    text={key.name}
                                    label='Location_preview_card'
                                    path='/locationdetails'
                                />
                            </ul>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}

export default Discover