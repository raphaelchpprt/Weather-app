import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import DayCard from './DayCard';

const WeekContainer = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKey}`;
  const cities = ['Biarritz', 'Lacanau', 'Bordeaux'];

  const [data, setData] = useState();
  const [city, setCity] = useState();

  const getDataFromCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      fetch(`${url}&lat=${latitude}&lon=${longitude}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === '200') {
            setData(data);
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  };

  useEffect(() => {
    getDataFromCurrentLocation();
  }, []);

  useEffect(() => {
    if (city)
      fetch(`${url}&q=${city}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === '200') {
            setData(data);
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
  }, [city]);

  return (
    <div className="weekContainer">
      <div className="mt-3">
        <button
          type="button"
          className="btn btn-dark m-2"
          onClick={getDataFromCurrentLocation}
        >
          📍 Current location
        </button>
        {cities.map((e) => (
          <button
            type="button"
            className="btn btn-dark m-2"
            key={shortid.generate()}
            onClick={() => setCity(e)}
          >
            {e}
          </button>
        ))}
      </div>
      {data && (
        <div className="dataContainer mt-4 mb-2">
          <h3 className="mb-4">
            <b>
              <span class="badge badge-secondary badge-outlined">
                {data.city.name}
              </span>
            </b>
          </h3>
          <div className="row justify-content-center mr-0 ml-0">
            {data.list
              .filter((e) => e.dt_txt.includes('12:00:00'))
              .map((e) => (
                <DayCard reading={e} key={shortid.generate()} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekContainer;
