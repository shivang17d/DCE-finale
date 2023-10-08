import styles from './MyMarker.module.css';
import './MyMap.css';
import { Marker, InfoWindow } from "@react-google-maps/api";
import { React, memo, useState, useEffect } from 'react';
import axios from 'axios';
const data = require('./places.json');

function Card({ place }) {
    return (
        <div className={styles.info}>
            <h2>{place.name}</h2>
            <img src={place.imgurl} alt={place.name} />
            <p>{place.city}</p>
        </div>
    )
}


function MyMarker({ icons }) {

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [clients, setClients] = useState([]);
    useEffect(() => {
        const fetchData = () => {

            axios.get(`${process.env.REACT_APP_URL}/clientscontent/allclients`).then((response) => {
                setClients(response.data);
                //    setIsloaded(true);
                console.log(clients);
            }).catch((err) => {
                console.log(err);
            });


        };
        fetchData();
    }, []);
    let closeTimeout;
    const handleMouseOver = (place) => {
        clearTimeout(closeTimeout);
        setSelectedPlace(place);
    };

    const handleMouseOut = () => {
        closeTimeout = setTimeout(() => {
            setSelectedPlace(null);
        }, 1000); // Adjust the delay as needed
    };

    useEffect(() => {
        return () => {
            clearTimeout(closeTimeout);
        };
    }, []);

    return (
        <>
            {(clients.length > 0) ? clients.map((place) => {
                console.log(clients.length);
                console.log(place.coordinates[0]['lat'])
                return (
                    <>
                        <Marker
                            position={{ lat: parseFloat(place.coordinates[0]['lat']), lng: parseFloat(place.coordinates[0]['lon']) }}
                            title={place.name}
                            icon={{
                                url: icons[place.type].icon,
                                scaledSize: new window.google.maps.Size(30, 30)
                            }}
                            onMouseOver={() => handleMouseOver(place)}
                            onClick={() => handleMouseOver(place)}
                            onMouseOut={() => handleMouseOut()}

                        />
                        {
                            selectedPlace ? (
                                <InfoWindow

                                    position={{ lat: parseFloat(selectedPlace.coordinates[0]['lat']), lng: parseFloat(selectedPlace.coordinates[0]['lon']) }}
                                    onCloseClick={() => setSelectedPlace(null)}
                                    options={{
                                        pixelOffset: new window.google.maps.Size(0, -20) // Specify the desired margin
                                    }}
                                >
                                    <div className="custom-info-window">
                                        <Card place={selectedPlace} />
                                    </div>
                                </InfoWindow>
                            ) : null
                        }
                    </>
                )
            }) : null
            }
        </>
    )
};

export default memo(MyMarker);

