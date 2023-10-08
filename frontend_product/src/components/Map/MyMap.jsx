import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from 'react';
import MyMarker from "./MyMarker";


// getting data from database
const icons = {
  Food_Processing: {
    name: "Food Processing",
    icon: "https://cdn-icons-png.flaticon.com/512/5060/5060752.png"
  },
  Brewery: {
    name: "Brewery",
    icon: "https://cdn-icons-png.flaticon.com/512/184/184482.png"
  },
  Beverages: {
    name: "Beverages",
    icon: "https://cdn-icons-png.flaticon.com/512/820/820603.png"
  },
  Dairy: {
    name: "Dairy",
    icon: "https://cdn1.iconfinder.com/data/icons/waste-and-recycling-management-colored/130/Asset_252-512.png"
  }
}

function Legends({product}) {
  return (
    <div>
      <img src={product.icon} width="30px" height="30px"/>
      {product.name}
    </div>
  );
};

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });


  const center = { lat: 21.449759, lng: 76.108221 };

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={{width: '100%', height: '100%'}}
        center={center}
        zoom={5}
        
      >
        <MyMarker icons={icons}></MyMarker>
        <div id="legend">
          <h3>Clients</h3>
          <Legends product={icons.Food_Processing} />
          <Legends product={icons.Beverages} />
          <Legends product={icons.Brewery} />
          <Legends product={icons.Dairy} />
        </div>
      </GoogleMap>
    </div>
  );
}


export default MyMap;