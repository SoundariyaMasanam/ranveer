import React, { useEffect } from 'react';
import "assets/css/Spotlights/Spotlights.css";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BsArrowLeftShort } from "react-icons/bs"

const AnnouncementDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const navigate = useNavigate();
  const { announcementsList } = useSelector(state => state.member);
  let { id, d } = useParams();
  const [currentAnnouncements, setCurrentAnnouncements] = useState(false);
  useEffect(() => {
    if (Object.keys(announcementsList).length > 0
      && announcementsList.data.length > 0) {
      announcementsList.data.map(item => {
        if (item.id === parseInt(id)) {
          setCurrentAnnouncements(item);
        }
      })
    }
  }, [id])
  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        {currentAnnouncements &&
          <div className="widget widget-table-one">
            <div className="col-xl-12 col-lg-12 align-self-center w-100">
              <Link to={`${typeof d !== "undefined" ? '/dashboard' : '/announcements'}`} onClick={() => navigate(-1)}>
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
                <img src={currentAnnouncements?.thumbnail} width="100%" alt="Responsive image" className="img-fluid"/>
              </div>
            </div>
            <div className="card widget-content mt-3">
              <div className="row p-3">
                <div className="col-xl-12">
                  <div className="overflow-hidden p-0">
                    <div className="">
                      <h4 className="mb-3 strong" style={{ textAlign: "left", fontWeight: "bold",fontSize:"20px" }}>{currentAnnouncements?.title}</h4>
                      <h6 className="mb-3 font-17">{currentAnnouncements?.category_title}</h6>
                      <h6 className="col-12 mb-4 d-flex justify-content-end" style={{ textAlign: "center", fontSize: "12px" }}>
                        <span style={{ fontWeight: "700", fontSize: "14px" }}>
                          Published on : &nbsp;</span>{currentAnnouncements?.publish_date}
                      </h6>
                      <p className="" style={{ fontSize: "14px", color: "#515050" }}>
                        <span dangerouslySetInnerHTML={{ __html: currentAnnouncements?.description }} ></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      
    </>
  )
}

export default AnnouncementDetails

