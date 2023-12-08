import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd';
import "assets/css/Exhibitions/Exhibitions.css"
import ExhibitionTable from '../ExhibitionTable/ExhibitionTable';
import ExhibitionDetails from '../ExhibitionDetails/ExhibitionDetails';
import { contentStyle, headingStyle } from './Carousal';
import { useDispatch, useSelector } from 'react-redux';
import { getExhibitionBanner } from "redux/Actions/EventExhibition";
import { setLogout } from "redux/Reducers/LoggedSlice";
import { useNavigate } from "react-router-dom";

const ExhibitionCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExhibitionBanner());
  }, [dispatch])
  const {
    tokenExp,
    bannerList
  } = useSelector(state => state.exhibition);
  useEffect(() => {
    if (tokenExp && Object.keys(tokenExp).length > 0
      && tokenExp.error === 'Invalid token') {
      dispatch(setLogout());
      navigate("/");
    }
  }, [tokenExp])
  const [showDetails, setShowDetails] = useState(0)

  return (
    <>
      {showDetails === 0 ?
        <>
          <div className="layout-pxx-spacing">
            <div className="row pt-4">
              <div className="col-lg-12 col-md-12 col-xl-12 col-12 layout-spacing">
                <div className='statbox exhibitionBannerCard box box-shadow'>
                  <div className='custom-carousel'>
                    <div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12 p-0">
                          <Carousel >
                            {Object.keys(bannerList).length > 0 &&
                              bannerList.data.length > 0 &&
                              bannerList.data.map((item, index) => {
                                return (
                                  <div className='col-xl-12' key={`cr${index}`}>
                                    {/* <div className="overflow-hidden"> */}
                                    <img src={item?.exh_banner_url} className='img-fluid conferenceBanners' />

                                    {/* <img src={item?.exh_banner_url} style={{ width: "1200px" }} className='img-fluid' /> */}
                                    <div className='col-12 d-flex justify-content-md-start justify-content-center justify-content-sm-center justify-content-xl-start justify-content-lg-start flex-row flex-md-column d-md-flex'>
                                      <div className=''>
                                        {/* <h3 className='headingEvent'>{item?.for_year}</h3> */}
                                      </div>
                                      <div
                                        onClick={() => setShowDetails(item?.for_year)} className='headingBtnEvent'>View & Submit Events
                                      </div>
                                    </div>
                                    {/* </div> */}
                                  </div>
                                )
                              })}
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="layout-pxxx-spacing ">
            <ExhibitionTable />
          </div>
        </>
        :
        <ExhibitionDetails
          setShowDetails={setShowDetails}
          showDetails={showDetails}
        />
      }
    </>
  )
}

export default ExhibitionCard