import React, { useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "assets/css/Spotlights/Spotlights.css";
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsArrowLeftShort } from "react-icons/bs";

const SpotlightDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const navigate = useNavigate();
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
  const { spotlightListing } = useSelector(state => state.spotlight);
  let { id } = useParams();
  const [currentSpotlight, setCurrentSpotlight] = useState(false);
  useEffect(() => {
    if (Object.keys(spotlightListing).length > 0
      && spotlightListing.data.length > 0) {
      spotlightListing.data.map(item => {
        if (item.id === parseInt(id)) {
          setCurrentSpotlight(item);
        }
      })
    }
  }, [id])

  return (
    <>
      <div className="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing">
        <div>
          {currentSpotlight &&
            <div className="widget widget-table-one">
              <div className="col-xl-12 col-lg-12 align-self-center w-100">
                <Link onClick={() => navigate(-1)}>
                  <div className="btn btn-sm readmorebtn text-white p-1">
                    <i className="las la-arrow-left">
                      <BsArrowLeftShort />
                    </i>
                    Back
                  </div>
                </Link>
              </div>
              <div className="col-xl-12">
                <div className="overflow-hidden p-0 mt-3">
                  {
                    (() => {
                      const thumbnail = currentSpotlight?.thumbnails.split(',');
                      if (thumbnail.length === 1) {
                        return (thumbnail.map((item, index) => {
                          return (<img key={`i${index}`} src={item} width="100%" className='thumbnailCaroseul' />);
                        }))
                      } else {
                        return (
                          <Carousel
                            autoPlay={true}
                            removeArrowOnDeviceType={["mobile"]}
                            responsive={responsive}
                            autoPlaySpeed={2000}
                            infinite={true}
                          >
                            {thumbnail.length > 0 &&
                              thumbnail.map((item, index) => {
                                return (<img key={`i${index}`} src={item} width="100%" className='thumbnailCaroseul' />);
                              })
                            }
                          </Carousel>
                        )
                      }
                    })()
                  }
                </div>
              </div>
              <div className="card widget-content mt-3">
                <div className="row p-3">
                  <div className="col-xl-12">
                    <div className="overflow-hidden p-0">
                      <div className="">
                        <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                          <br />
                          <h6 className="mb-3 strong" style={{ textAlign: "left", fontWeight: "bold", fontSize: "28px" }}>{currentSpotlight?.title}</h6>
                          <h6 className="col-12 mb-1 d-flex justify-content-start" style={{ textAlign: "center" }}>
                            <span style={{ fontWeight: "600", fontSize: "11px", color: "#737373" }}>
                              Category :
                            </span>&nbsp;
                            <span style={{ fontSize: "11px", color: "#A0A0A8" }}>
                              {currentSpotlight?.category_title}
                            </span>
                          </h6>
                          <h6 className="col-12 mb-4 d-flex justify-content-start" style={{ textAlign: "center", fontSize: "11px" }}>
                            <span style={{ fontWeight: "600", fontSize: "11px", color: "#737373" }}>
                              Published on :
                            </span>&nbsp;
                            <span style={{ fontSize: "11px", color: "#A0A0A8" }}>
                              {currentSpotlight?.publish_date}
                            </span>
                          </h6>
                        </div>
                        <p className="" style={{ fontSize: "14px", color: "#515050" }}>
                          <span dangerouslySetInnerHTML={{ __html: currentSpotlight?.description }} ></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default SpotlightDetails

