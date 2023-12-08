import React, { useEffect, useState } from 'react'
import "assets/css/Dashboard/Announcement.css"
// import BoldHeading from 'components/BoldHeading/BoldHeading'
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "assets/css/Dashboard/FeaturedCompany.css";
import "assets/css/Dashboard/TitleCard.css";
import { memberAnnouncements } from "redux/Actions/Member";
import { useDispatch, useSelector } from 'react-redux'
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

const Announcement = () => {
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

  const dispatch = useDispatch();
  const { announcementsList } = useSelector(state => state.member);
  useEffect(() => {
    dispatch(memberAnnouncements({}));
  }, []);
  const [featuredData, setFeaturedData] = useState([]);
  useEffect(() => {
    let tempData = [];
    if (Object.keys(announcementsList).length > 0
      && announcementsList.data.length > 0) {
      announcementsList.data.map((item, index) => {
        // console.log("item----------------------->", item);
        tempData.push({
          title: item.title,
          description: item.description,
          frontThumbnail: item.thumbnails,
          insideImg: item.thumbnail,
          index: index + 1,
          id: item.id,
          publish_date: item?.publish_date
        });
      });
    }
    setFeaturedData(tempData);
  }, [announcementsList])


  return (
    <div className="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-table-one">
        <div className="widget-heading">
          <h5 className="">Announcements</h5>
        </div>
        <div className="widget-content mt-3" style={{ paddingRight: "15px" }}>
          <div className="row">
            <Carousel
              removeArrowOnDeviceType={["mobile"]}
              responsive={responsive}
            >
              {featuredData?.length > 0 &&
                featuredData?.map((item, index) => {
                  // console.log("itemAnnouncement---------------->", item)
                  const thumbnail = item.frontThumbnail ? item.frontThumbnail.split(',') : [];
                  return (
                    <div className=" col-12 p-md-3 p-4" key={`we${index}`}>
                      <div className="card widget overflow-hidden p-0">
                        {thumbnail.length > 0 &&
                          <img className="card-img-top" src={thumbnail[0]} alt="Card image cap" />
                        }
                        {/* <img className="card-img-top" src={thumbnail[0]} alt="Card image cap"/> */}
                        {/* <div style={{ backgroundImage: `url(${item.img})`, backgroundSize: "cover", height: "200px" }}></div> */}
                        <div className="p-3" style={{ minHeight: "200px" }}>
                          <Link to={`/announcements/details/${item.id}`}>
                            <div className="text-black">
                              <h6 className="mb-3 strong" style={{ fontWeight: "600", fontSize: "17px", height: "60px" }}>
                                {item?.title}
                              </h6>
                            </div>
                          </Link>

                          <h6 className="mb-3" style={{ fontSize: "11px" }}>
                            Published on : {item?.publish_date}
                          </h6>
                          <p className="mb-3 paraSpotlight1" style={{ fontSize: "14px", color: "#515050" }}>
                            <span dangerouslySetInnerHTML={{ __html: item?.description.slice(0, 200) }} ></span></p>
                        </div>

                        <div className="col-12 card-footer">
                          <Link to={`/announcements/details/${item.id}`}>
                            <div className="d-flex col-12 justify-content-center btn btn-sm readmorebtn text-white">
                              <div > Read More</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })

              }
            </Carousel>
            {featuredData?.length < 0 &&
              featuredData?.map((item, index) => {
                return (
                  <div className=" col-12 d-flex justify-content-center">Submit Announcements*</div>
                )
              })
            }
          </div>
        </div>
        <div className='col-12 d-flex justify-content-center mt-3'>
          <Link to="/announcements">
            <div className="btn btn-sm text-white readmorebtn">
              <div > View More</div>
            </div>
          </Link>
        </div>       
      </div>
    </div>
  )
}

export default Announcement