import React, { useEffect, useState } from 'react';
import "assets/css/Dashboard/VisitedProfile.css";
import BoldHeading from 'components/BoldHeading/BoldHeading';
import { MDBVectorMap } from 'mdb-react-vector-maps';

const convertLatLongToXY = (latitude, longitude, mapWidth, mapHeight) => {
  const x = (mapWidth * (180 + parseFloat(longitude)) / 360)+82;
  const y = (mapHeight / 180) * (90 - parseFloat(latitude))+156;
  return { x, y };
};

const VisitedProfile = ({ visitedProfiles }) => {
  const [markers, setMarkers] = useState([]);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const mapContainer = document.getElementById('map-1');
    const mapWidth = mapContainer.offsetWidth;
    const mapHeight = mapContainer.offsetHeight;

    console.log('Map Width:', mapWidth);
    console.log('Map Height:', mapHeight);

    setMapDimensions({ width: mapWidth, height: mapHeight });
  }, []);

  useEffect(() => {
    if (visitedProfiles && visitedProfiles.data && mapDimensions.width && mapDimensions.height) {
      const updatedMarkers = visitedProfiles.data
        .filter(item => item.latitude && item.longitude)
        .map(item => {
          const { x, y } = convertLatLongToXY(item.latitude, item.longitude, mapDimensions.width, mapDimensions.height);
          return {
            x,
            y,
            label: `${item.first_name} ${item.last_name} ${item.company_name}`,
            type: 'bullet',
            fill: '#BBCE00',
          };
        });

      setMarkers(updatedMarkers);
    }
  }, [visitedProfiles, mapDimensions]);

  return (
    <div className="col-xl-8 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing" style={{ marginTop: "10px" }}>
      <div className="widget widget-chart-one" id="map-1">
        <BoldHeading
          Boldheading="Licensees who visited your profile"
        />
        <div className="">
          <div className="row mt-4">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div data-mdb-vector-map-init id="map-1" data-mdb-select-region="CA">
                <MDBVectorMap
                  map='world'
                  markers={markers}
                  containerStyle={{
                    width: "100%",
                    height: "520px"
                  }}
                  containerClassName="map"
                />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitedProfile;
