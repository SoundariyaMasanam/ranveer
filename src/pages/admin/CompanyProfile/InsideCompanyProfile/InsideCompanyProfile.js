import React, { useEffect, useState } from 'react';
import "assets/css/CompanyProfile/CompanyProfile.css";
import BoldHeading from 'components/BoldHeading/BoldHeading';
import { MDBVectorMap } from 'mdb-react-vector-maps';

const convertLatLongToXY = (latitude, longitude, MAP_WIDTH, MAP_HEIGHT) => {
  const x = (MAP_WIDTH * (180 + parseFloat(longitude)) / 360);
  const y = (MAP_HEIGHT / 180) * (90 - parseFloat(latitude));
  return { x, y };
};

const InsideCompanyProfile = ({ data, info, bInfo, country, branchId }) => {
  const MAP_WIDTH = 950;
  const MAP_HEIGHT = 1380;

  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const updatedMarkers = [];
  
    if (
      info?.latitude !== null
      && info?.longitude !== null
      && info?.latitude !== ''
      && info?.longitude !== ''
    ) {
      const { x, y } = convertLatLongToXY(info.latitude, info.longitude, MAP_WIDTH, MAP_HEIGHT);
      updatedMarkers.push({
        x,
        y,
        label: info.city,
        type: 'bullet', // Add bullet type
        fill: '#BBCE00', // Add fill color if needed
      });
    }
  
    if (data.length > 0) {
      data.forEach(item => {
        if (
          item?.latitude !== null
          && item?.longitude !== null
          && item?.latitude !== ''
          && item?.longitude !== ''
        ) {
          const { x, y } = convertLatLongToXY(item.latitude, item.longitude, MAP_WIDTH, MAP_HEIGHT);
          updatedMarkers.push({
            x,
            y,
            label: item.city,
            type: 'bullet', // Add bullet type
            fill: '#BBCE00', // Add fill color if needed
          });
        }
      });
    }
  
    setMarkers(updatedMarkers);
  }, [info, data]);
  

  return (
    <div className="col-xl-12 col-lg-8 col-md-12" style={{ marginTop: "25px" }}>
      <div className="profile-info">
        <div className="widget-header">
          <BoldHeading
            Boldheading="Company Location"
          />
        </div>
        <br />
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
  );
};

export default InsideCompanyProfile;
