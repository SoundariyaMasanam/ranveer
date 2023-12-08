import React, { useEffect } from 'react';
import "assets/css/Spotlights/Spotlights.css";
import TalaSearch from '../TalaSearch/TalaSearch';
import SpotlightListing from "components/Spotlight/SpotlightListing";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotlightBanner } from "redux/Actions/Spotlight";

const TalaSpotlightsCard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotlightBanner());
  }, [])
  const { spotlightBanner } = useSelector(state => state.spotlight);
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/spotlightsubmission")
  }
  return (
    <>
      <div className="col-lg-12 col-md-12 col-xl-12 col-12 layout-spacing" >
        <div className='statbox exhibitionBannerCard box box-shadow'>
          <div className='custom-carousel'>
            <div>
              <div className="row">
                <div className="col-lg-12 col-md-12 p-0">
                  <Carousel >
                    <div className='col-xl-12'>
                      {/* <div className="overflow-hidden"> */}
                      {Object.keys(spotlightBanner).length > 0
                        && Object.keys(spotlightBanner.data).length
                        && spotlightBanner.data.map((item, index) => {
                          // const thumbnail = item.thumbnails.split(',');
                          const thumbnail = item.thumbnail;
                          return (<img key={`sp${index}`}
                            src={thumbnail} className='img-fluid conferenceBanners' />)
                        })
                      }
                      <div className='mt-5 submitSpotlight'>
                        {/* <button type="primary" shape="round" size={`lfarge`} onClick={handleClick} className='btnForsubmitSpotlight'>
                          Submit Spotlights
                        </button> */}
                        <button type="submit"
                          className="col-12 btn bg-gradient-primarys text-white "  onClick={handleClick}>
                          Submit Spotlights
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing mt-4'>
        <div className='widget widget-table-one'>
          <div className='widget-content' >
            <div className="col-xl-12 col-md-12 col-sm-12 col-12">
              <br /> <h4 style={{ textAlign: "center" }}>TALA Spotlight</h4><br />
            </div>
            <TalaSearch />
            <div className="row">
              <SpotlightListing />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TalaSpotlightsCard