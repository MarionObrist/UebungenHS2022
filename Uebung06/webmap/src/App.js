import React from 'react';

import "leaflet/dist/leaflet.css";
import "./App.css";


import { MapContainer, TileLayer, Marker, Popup, useMap, Circle} from 'react-leaflet';


function App() {

  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  const AKWS = [
    {pos: [46.97792, 7.25792],
    name: "Kernkraftwerk Mühleberg",
    betriebsphase: "06.11.1972 - 20.12.2019"},
    {pos: [47.37264, 7.96492],
    name: "Kernkraftwerk Gösgen",
    betriebsphase:"01.11.1979 -"},
    {pos: [47.60540, 8.16671],
    name: "Kernkraftwerk Leibstadt",
    betriebsphase:"15.12.1984 -"},
    {pos: [47.55097, 8.22325],
    name: "Kernkraftwerk Beznau",
    betriebsphase:"04.1972 -"}
  ];

  const circleStyle = {color: "blue"};

return (
  <MapContainer center={[46.837059452, 8.294950016]} zoom={8} scrollWheelZoom={true}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />


  <Marker position={AKWS[0].pos}>
    <Popup><b>{AKWS[0].name}</b><br/>
    {AKWS[0].betriebsphase}</Popup>
  </Marker>
  <Marker position={AKWS[1].pos}>
    <Popup><b>{AKWS[1].name}</b><br/>
    {AKWS[1].betriebsphase}</Popup>
  </Marker>  <Marker position={AKWS[2].pos}>
    <Popup><b>{AKWS[2].name}</b><br/>
    {AKWS[2].betriebsphase}</Popup>
  </Marker>  <Marker position={AKWS[3].pos}>
    <Popup><b>{AKWS[3].name}</b><br/>
    {AKWS[3].betriebsphase}</Popup>
  </Marker>

  <Circle center={AKWS[0].pos} radius={50000} pathOptions={circleStyle}></Circle>
  <Circle center={AKWS[1].pos} radius={50000} pathOptions={circleStyle}></Circle>
  <Circle center={AKWS[2].pos} radius={50000} pathOptions={circleStyle}></Circle>
  <Circle center={AKWS[3].pos} radius={50000} pathOptions={circleStyle}></Circle>
  


</MapContainer>
  );
}

export default App;


