import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotlightListing } from "redux/Actions/Spotlight";
import { Link } from 'react-router-dom';
import "assets/css/Dashboard/FeaturedCompany.css";
import "assets/css/Dashboard/TitleCard.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const DashboardSpotlights = () => {
  const dispatch = useDispatch();
  const { spotlightListing } = useSelector(state => state.spotlight);

  useEffect(() => {
    dispatch(getSpotlightListing());
  }, [])
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-table-one">
        <div className="widget-heading">
          <h5 className="">TALA Spotlight</h5>
        </div>
        <div className="widget-content mt-3" style={{ paddingRight: "15px" }}>
          <div className="row">
            <Carousel
              removeArrowOnDeviceType={["mobile"]}
              responsive={responsive}
            >
              {Object.keys(spotlightListing).length > 0
                && spotlightListing.data.length > 0
                &&
                spotlightListing.data.map((item, index) => {
                  const thumbnail = item.thumbnail ? item.thumbnail.split(',') : [];
                  return (
                    <div key={index} className=" col-12 p-md-2 p-4" >
                      <div className="card widget overflow-hidden p-0">
                        {thumbnail.length > 0 &&
                          <img className="card-img-top" src={thumbnail[0]} alt="Card image cap" />
                        }
                        <div className="p-3" style={{ minHeight: "280px" }}>
                          <Link to={`/talaspotlight/details/${item.id}`} >
                            <div className="text-black">
                              <h6 className="mb-3 strong" style={{ fontWeight: "600", fontSize: "17px" }}>{item.title}</h6>
                            </div>
                          </Link>
                          <h6 className="mb-2" style={{ fontSize: "11px" }}>Category : &nbsp;{item.category_title}</h6>
                          <h6 className="mb-3" style={{ fontSize: "11px" }}>Published on : &nbsp;{item?.publish_date} </h6>
                          <p className="mb-3 paraSpotlight" style={{ fontSize: "14px", color: "#515050" }}>
                            <span dangerouslySetInnerHTML={{ __html: item.description.slice(0, 200) }} >
                            </span>
                          </p>
                        </div>
                        <div className="col-12 card-footer">
                          <Link to={`/talaspotlight/details/${item.id}`} >
                            <div className="d-flex col-12 justify-content-center btn btn-sm text-white readmorebtn">
                              <div > Read More</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </Carousel>
          </div>
        </div>
        <div className='col-12 d-flex justify-content-center mt-3'>
          <Link to="/talaspotlight/viewmore">
            <div className="btn btn-sm text-white readmorebtn">
              <div > View More</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardSpotlights
