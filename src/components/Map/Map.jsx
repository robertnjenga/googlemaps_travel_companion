import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width: 600px)');

  const Marker = ({ place }) => {
    return (
      <div className={classes.markerContainer}>
        {!isDesktop ? (
          <LocationOnOutlinedIcon color="primary" fontSize="large" />
        ) : (
          <Paper elevation={3} className={classes.paper}>
            <Typography
              className={classes.typography}
              variant="subtitle2"
              gutterBottom
            >
              {place.name}
            </Typography>
            <img
              src={
                place.photo
                  ? place.photo.images.large.url
                  : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
              }
              className={classes.pointer}
              alt={place.name}
            />
            <Rating size="small" value={Number(place.rating)} readOnly />
          </Paper>
        )}
      </div>
    );
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <Marker
            place={place}
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          />
        ))}
        {/* {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.long}>
            <img
              height={100}
              src={`https://rapidweather.p.rapidapi.com/data/2.5/weather/${data.weather[0].icon}`}
              alt={''}
            />
          </div>
        ))} */}
      </GoogleMapReact>
    </div>
  );
};
export default Map;
