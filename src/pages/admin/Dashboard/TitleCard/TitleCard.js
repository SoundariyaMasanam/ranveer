import React from 'react'
import "assets/css/Dashboard/TitleCard.css"
import {
  FaRegPaperPlane,
  FaRegHandshake,
  FaBook
} from "react-icons/fa"
import { BsBox2 } from "react-icons/bs"
import { Link } from "react-router-dom";

const TitleCard = ({ dashWidgets }) => {
  
  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ marginTop: "25px" }}>
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <Link to="/sendviewquote/s">
            <div className="widget quick-category" >
              <div className="quick-category-head d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center">
                <span className="quick-category-icon qc-primary rounded-circle1">
                  <i className="fa fa-paper-plane-o" aria-hidden="true">
                    <FaRegPaperPlane />
                  </i>
                </span>
              </div>
              <div className="quick-category-content d-flex flex-md-column flex-row justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center gap-md-0 gap-2">
                <h3 className='d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center'>{dashWidgets?.data?.sent_quotes}</h3>
                <p className="mytext-primary mb-0 d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center" style={{ fontWeight: "700",fontSize:"16px"  }}>Quotes Sent</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mb-md-3 mb-3 mt-md-0 mt-xl-0 mt-lg-0 mt-2">
          <Link to="/sendviewquote/r">
            <div className="widget quick-category">
              <div className="quick-category-head d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center">
                <span className="quick-category-icon qc-warning rounded-circle1">
                  <i className="las la-box">
                    <BsBox2 />
                  </i>
                </span>
              </div>
              <div className="quick-category-content d-flex flex-md-column flex-row justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center gap-md-0 gap-2">
                <h3 className='d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center'>{dashWidgets?.data?.received_quotes}</h3>
                <p className="mytext-warning mb-0 d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center" style={{ fontWeight: "700",fontSize:"16px" }}>Quotes Received</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mb-md-3 mb-3">
          <Link to="/spotlightsubmission">
            <div className="widget quick-category" >
              <div className="quick-category-head d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center">
                <span className="quick-category-icon qc-secondary rounded-circle1">
                  <i className="fa fa-handshake-o" aria-hidden="true">
                    <FaRegHandshake />
                  </i>
                </span>
              </div>
              <div className="quick-category-content d-flex flex-md-column flex-row justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center gap-md-0 gap-2">
              <h3 className='d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center'>{dashWidgets?.data?.submitted_spotlight}</h3>
                <p className="mytext-secondary mb-0 d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center" style={{ fontWeight: "700",fontSize:"16px" }}>Spotlight Submission</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mb-md-3 mb-3">
          <Link to="/documents">
            <div className="widget quick-category " >
              <div className="quick-category-head d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center">
                <span className="quick-category-icon qc-success-teal rounded-circle1">
                  <i className="fa fa-book1" aria-hidden="true">
                    <FaBook />
                  </i>
                </span>
              </div>
              <div className="quick-category-content d-flex flex-md-column flex-row justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center gap-md-0 gap-2">
                <h3 className='d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center'>{dashWidgets?.data?.total_documents}</h3>
                <p className="mytext-success-teal mb-0 d-flex justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-center" style={{ fontWeight: "700",fontSize:"16px"  }}>Documents</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TitleCard