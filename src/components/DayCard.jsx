import React from 'react';
import moment from 'moment';

const DayCard = ({ reading }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);

  return (
    <div className="col-md-2 col-sm-6 mt-3">
      <div className="card p-2 pt-4">
        <h4 className="card-title">{moment(newDate).format('dddd')}</h4>
        <p className="text-muted">
          {moment(reading.dt_txt).format('MMMM Do, hh:mm')}
        </p>
        <img
          className="card-img"
          src={`https://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`}
        />
        <h2>{Math.round(reading.main.temp)} °C</h2>
        <div className="card-body">
          <p className="card-text">{reading.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
