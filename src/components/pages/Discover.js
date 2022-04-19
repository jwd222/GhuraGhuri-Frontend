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

    const HandleClick = (e) => {
        e.preventDefault();
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
        fetch('http://localhost:8081/location/discoverSearchName/name?name='+name, {
        }).then(response => response.json())
        .then(data => {
            setLocation(data);
            console.log(data);
        })
    };
    /*
    const HandleSearch = () => {
        Axios.post('http://localhost:3001/uniListSearchName', {
            Name: name
        }).then((response) => {
            setUniversity(response.data);
            //console(response.data);
        })
    }*/


    const HandleSearchAll = (name, division, type) => {
        if (name === "" && (division === "" || division === "Choose Division") && (type === "" || type === "Choose Type")) {
             getAllLocationSortDown();
        }
        else if (name !== "" && (division === "" || division ==="Choose Division") && (type === "" || type === "Choose Type")) {
            getByName();
        }
        else if (name === "" && (division !== "" && division !== "Choose Division") && (type === "" || type === "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchDivision/division?division='+division, {
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }
      /*  else if (name !== "" && (division !== "" && division !== "Choose Division") && (type === "" || type === "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameDivision', {
                Name: name,
                Division: division
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }*/
        else if (name === "" && (division === "" || division === "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchType/type?type='+type, {
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }
      /*  else if (name !== "" && (division === "" || division === "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameType', {
                Name: name,
                Type: type
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }*/
        else if (name === "" && (division !== "" && division !== "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchDivisionType/divisiontype?division='+division+'&type='+type, {
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }
       /* else if (name !== "" && (division !== "" && division !== "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameDivisionType', {
                Name: name,
                Division: division,
                Type: type
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }*/
    }

    const HandleSearchAllUp = (name, division, type) => {
        if (name === "" && (division === "" || division === "Choose Division") && (type === "" || type === "Choose Type")) {
            getAllLocationSortUp();
        }
       /* else if (name !== "" && (division === "" || division === "Choose Division") && (type === "" || type === "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameUp', {
                Name: name
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }*/
        else if (name === "" && (division !== "" && division !== "Choose Division") && (type === "" || type === "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchDivisionUp/division?division='+division, {
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }
       /* else if (name !== "" && (division !== "" && division !== "Choose Division") && (type === "" || type ==="Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameDivisionUp', {
                Name: name,
                Division: division
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }*/
        else if (name === "" && (division === "" || division === "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchTypeUp/type?type='+type, {
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }
      /*  else if (name !== "" && (division === "" || division === "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameTypeUp', {
                Name: name,
                Type: type
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }*/
        else if (name === "" && (division !== "" && division !== "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchDivisionTypeUp/divisiontype?division='+division+'&type='+type, {
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }
      /*  else if (name !== "" && (division !== "" && division !== "Choose Division") && (type !== "" && type !== "Choose Type")) {
            fetch('http://localhost:8081/location/discoverSearchNameDivisionTypeUp', {
                Name: name,
                Division: division,
                Type: type
            }).then(response => response.json())
            .then(data => {
                setLocation(data);
                console.log(data);
            })
        }*/
    }


    const handleSubmit = e => {
        e.preventDefault();
        HandleSearchAll(name, division, type);
    }

    return (

        <div className="Discover">
            <h1 className="alllocation">All Locations</h1>

            <div className='searchbar' >
                <form action='/' method="GET" className='searchform' onSubmit={(e) => {
                     const selectedState = e.target.value;
                     setName(selectedState);
                     handleSubmit(e);
                     
                }}>
                    <input type="text"
                        placeholder="Search"
                       
                    />
                    <input type="submit" />
                </form>
            </div>
            <div className='sortbutton' onClick={HandleClick}>
                <p>SORT</p>
                <i className={click ? 'fas fa-sort-up' : 'fas fa-sort-down'} />
            </div>
            <div className='selectdiv'>
                <select className="searchDivision"
                    onChange={(e) => {
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
                        const selectedState = e.target.value;
                        setType(selectedState);
                        HandleSearchAll(name, division, selectedState);
                    }}>
                    <option value='Choose Type'>Choose Type</option>
                    <option value='Historic'>Historic</option>
                    <option value='Beach'>Beach</option>
                    <option value='Mountain'>Mountain</option>
                    <option value='Amusement'>Amusement</option>
                </select>
            </div>

            {Object.entries(listOfLocation).map(([values, key]) => {
                return (
                    <div className='cards__container_location'>
                        <div className='cards__wrapper' >
                            <ul className='cards__item'
                                onClick={() => {
                                   // localStorage.setItem('userEmailDiscover', values.Email);
                                }}>
                                <CardItem
                                    src={key.imageURL}
                                    text={key.name}
                                    label='Location_preview_card'
                                    path='/locationprofilescreen'
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