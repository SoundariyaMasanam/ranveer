import React, { useState } from 'react'
import "assets/css/VideoGuide/Videos.css"
import { FaPhoneAlt, FaUsersSlash } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import noImage from "assets/img/noimg.jpg";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill
} from "react-icons/bs";
import { MdLocationPin } from "react-icons/md"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TeamMembers = ({info, data }) => {
  const responsive = {
    superLargeDesktop: {
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

  const [up, setUp] = useState(false);
  const [down, setDown] = useState(true);
  const ScollDown = () => {
    const scrollableDiv = document.querySelector('.scrollbarsvideo');
    scrollableDiv.scrollTop = scrollableDiv.scrollTop + 250;
    if (scrollableDiv.scrollTop > 0) {
      setUp(true);
    }
    if (scrollableDiv.scrollTop >= scrollableDiv.scrollHeight - 740) {
      setDown(false);
    }
  }
  const ScollUp = () => {
    const scrollableDiv = document.querySelector('.scrollbarsvideo');
    scrollableDiv.scrollTop = scrollableDiv.scrollTop - 250;

    if (scrollableDiv.scrollTop === 0) {
      setUp(false);
    }
    if (scrollableDiv.scrollHeight > 1400) {
      setDown(true);
    }
  }

  return (
    <div className="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing" style={{ marginTop: "25px" }}>
      <div className="widget widget-table-one">
        <div className="widget-heading" style={{marginLeft:"10px"}}>
          <h5 className=""> 
          { info?.strategic_type !== "Strategic partner" ? "Licensee " :'' }
          Team members
          </h5>
        </div>
        <div className="" style={{ paddingRight: "15px" }}>
          {data.length > 0 ?

            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlaySpeed={1000}
              transitionDuration={500}
              containerClass="carousel-container"
            >
              {data?.map((item, index) => {
                return (
                  <div className='overflow-hidden gap-3' key={index} >
                    <div className=" profile-left" style={{ marginBottom: "25px" ,margin:"10px"}}>                     
                      <center>
                        <img src={item?.profile_logo === '' ? noImage : item?.profile_logo} alt="image"
                          className="img-fluid img-thumbnail teamprofile rounded-circle" />
                      </center>
                      <center>
                        <p className="mb-0 personName">{item?.first_name} {item?.last_name}</p>
                        <p className="mb-0 personName1">{item?.designation}</p>
                        <center>
                          <div className="info-area">
                            <h6 style={{ lineBreak: 'anywhere', fontSize: "12px" }}>
                              <i className="fa fa-envelope-o" aria-hidden="true">
                                <GrMail />
                              </i>
                              &nbsp;&nbsp;{item?.email}
                            </h6>
                            <h6 style={{ fontSize: "12px" }}>
                              <i className="fa fa-phone" aria-hidden="true">
                                <FaPhoneAlt />
                              </i>
                              &nbsp;&nbsp;{item?.phone}
                            </h6>
                            <h6 style={{ fontSize: "12px" }}>
                              <i className="fa fa-phone" aria-hidden="true">
                                <MdLocationPin />
                              </i>
                              &nbsp;&nbsp;{`${item?.branch_name}`}
                            </h6>
                          </div>
                          <br />
                        </center>
                      </center>
                    </div>
                    
                  </div>
                )
              })}

            </Carousel>
            :
            <div className="profile-left">
              <center>
                <h6 className='annualTitles mb-4'>Team Licensee</h6>
                <FaUsersSlash style={{ fontSize: "40px", color: "rgba(0, 0, 0, 0.25)" }} />
                <p className='mt-3' style={{ fontSize: "12px", color: "grey " }}> No Team Member</p>
              </center>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default TeamMembers