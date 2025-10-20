import { MapContainer, TileLayer, Marker, Popup, Polygon, ZoomControl } from "react-leaflet";
import React, { JSX, useEffect, useRef } from "react";
import { useMapUpdate } from "../providers/MapProvider.tsx";
import { parseCoordinates } from "../utils/parseCoordinates.ts";
import { getDistrictPopup } from "../utils/getDistrictPopup.tsx";
import { getRandomColor } from "../utils/getRandomColor.ts";

const position: [number, number] = [-23.533773, -46.62529];

const MapComponent: React.FC = () => {
  const { districts2Render } = useMapUpdate();
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  let polygons: JSX.Element[] = [];

  if (districts2Render) {
    if (Array.isArray(districts2Render)) {
      polygons = districts2Render.map((district, index) => (
        <Polygon
          key={index}
          positions={parseCoordinates(district.coordinates)}
          color={getRandomColor()}
        >
          {getDistrictPopup(district)}
        </Polygon>
      ));
    } else {
      polygons = [
        <Polygon
          key={0}
          positions={parseCoordinates(districts2Render.coordinates)}
          color={getRandomColor()}
        >
          {getDistrictPopup(districts2Render)}
        </Polygon>,
      ];
    }
  }


  return (
    <MapContainer center={position} zoom={10} zoomControl={false}className="map-container">
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
      />
      <ZoomControl position="bottomright"></ZoomControl>
      {polygons}
    </MapContainer>
  );
};

export default MapComponent;
