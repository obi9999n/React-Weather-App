import React, { useState, useEffect } from 'react';

const SearchWeather = () => {
    const [search, setSearch] = useState("london");
    const [data, setData] = useState("[]");
    const [input, setInput] = useState("");
    let componentMounted = true;

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d9d70756f5eb5bade0cd76297dbe7df2`);
            if (componentMounted) {
                setData(await response.json());
                console.log(data);
            }
            return () => {
                componentMounted = false;
            }
        }
        fetchWeather();
    }, [search]);
    let emoji = null;
    if (typeof data.main != "undefined") {
        if (data.weather[0].main == "Clouds") {
            emoji = "fa-cloud";
        } else if (data.weather[0].main == "Thunderstorm") {
            emoji = "fa-bolt";
        } else if (data.weather[0].main == "Drizzle") {
            emoji = "fa-cloud-rain";
        } else if (data.weather[0].main == "Rain") {
            emoji = "fa-cloud-shower-heavy"
        } else if (data.weather[0].main == "Snow") {
            emoji = "fa-snow-flake"
        } else {
            emoji = "fa-smog"
        }
    } else {
        return (
            <div>...loading</div>
        )
    }

    let temp = (data.main.temp - 273.15).toFixed(2);
    let temp_min = (data.main.temp_min - 273.15).toFixed(2);
    let temp_max = (data.main.temp_max - 273.15).toFixed(2);

    //date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: 'long' });
    let day = d.toLocaleString("default", { weekday: 'long' });

    //time

    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    }



    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div class="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} class="card-img" alt="..." />
                            <div class="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div class="input-group mb-4 w-75 mx-auto">
                                        <input
                                            type="search"
                                            class="form-control"
                                            placeholder="Search by City"
                                            aria-label="Search by City"
                                            aria-describedby="basic-addon2"
                                            name="search"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            required
                                        />

                                        <button type="submit" class="input-group-text" id="basic-addon2">
                                            <i className="fas fa-search"></i>
                                        </button>


                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                    <h2 class="card-title">{data.name}</h2>
                                    <p class="card-text lead">
                                        {day}, {month}, {year}
                                        <br />
                                        {time}
                                    </p>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bold'>{temp} &deg;C</h1>
                                    <p className='lead fw-border mb-0'>{data.weather[0].main}</p>
                                    <p className="lead">{temp_min} &deg; C | {temp_max} &deg;F</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchWeather;
