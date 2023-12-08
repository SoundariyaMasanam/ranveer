import React, { useEffect } from 'react';
import "assets/css/AnnualConference/AnnualConference.css"
import { RotatingLines } from 'react-loader-spinner';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Timer from '../Timer/Timer';
import { useDispatch, useSelector } from 'react-redux';
import { getConferenceBanner } from "redux/Actions/AnnualConference";
import { saveAs } from "file-saver";
import annual from "assets/img/annual.jpg"

const AnnualConferenceCard = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConferenceBanner());
  }, [])
  const { isLoading, conferenceBanner } = useSelector(state => state.annualconference);

  const downloadFile = (url) => {
    (async () => {
      saveAs(url, "doc-file");
    })();
  }

  return (
    <div className="widget-header">
      <div className="row">
        {!isLoading ?
          <div className="col-lg-12 col-md-12 p-0">
            <Carousel
              removeArrowOnDeviceType={["mobile"]}
              responsive={responsive}
            >
              {Object?.keys(conferenceBanner)?.length > 0
                && Object?.keys(conferenceBanner?.data)?.length > 0 &&
                <div className='anual-banner'>
                  <img src={conferenceBanner?.data?.banner_url} className='img-fluid conferenceBanner' />
                  <div className="col-12 d-flex flex-column justify-content-center carousel-captions ">
                    <h3 className='carousel-titles px-5' style={{ fontSize: "45px" }}>
                      <img src={annual} className='img-fluid annualBannerLogo' width="25%"/>
                    </h3>
                    {/* <h5>Days left for the Conference </h5> */}
                    <h5 style={{marginTop:"10px"}} className='annualBannerTitles'>Successfully Completed at Phuket, Thailand.</h5>
                    <div style={{fontFamily:"500"}} className='annualBannerTitles'>Conference images are now available, click and download from below.</div>
                    
                    {/* <div>
                      <Timer start_on={conferenceBanner?.data?.start_on} />
                    </div> */}
                    <div className='mt-md-3 mt-1'>
                      
                      <button type="button" className="btn btn-primarys mr-2"
                        // onClick={() => downloadFile(conferenceBanner?.data?.document_url)}
                        >
                        {/* Download Conference Images & Videos */}
                        <a target='_blank' href={`${conferenceBanner?.data?.document_url}`}>Download Conference Images & Videos</a>
                      </button>
                    </div>
                  </div>
                </div>
              }
            </Carousel>
          </div>
          : <div className="col-xl-12 col-lg-12" style={{ margin: "15% 40%" }}>
            <RotatingLines
              strokeColor="#bbce00"
              strokeWidth="5"
              animationDuration="1.00"
              width="70"
              visible={true}
            />
          </div>}
      </div>
    </div>
  )
}

export default AnnualConferenceCard