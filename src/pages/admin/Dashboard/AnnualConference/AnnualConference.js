import React from 'react'
import "assets/css/Dashboard/AnnualConference.css"
import newbadge from "assets/img/newbadge.png"
import annual from "assets/img/annual.jpg"
import { Link } from "react-router-dom";

const AnnualConference = () => {

  return (
    <div className="d-flex flex-column flex-md-column flex-lg-column flex-xl-column flex-sm-column col-xl-4 col-lg-4 col-md-12 col-sm-12 mb-4 gap-md-2 gap-xl-0 gap-lg-0 gap-0" style={{marginTop:"10px"}}>
      <div className="col-md-6 col-lg-12 col-xl-12 col-12 widget overflow-hidden text-center  mb-4">
        <div className="confetti">
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
        </div>
        <img src={annual} height="80px" width="240"/>
        <h5 className="" style={{fontSize:"20px",marginTop:"20px"}}>8th TALA<br/>Annual Conference</h5>
        <p className="text-muted" style={{lineHeight:"20px",marginTop:"20px"}}>Successfully Completed at Phuket,Thailand</p>
        <Link to="/annualconference/readmore">
          <button className="btn btn-sm bg-gradient-primary text-white mt-3 mb-3">Check Now</button>
        </Link>
      </div>

      <div className="col-md-6 col-lg-12 col-xl-12 col-12 widget overflow-hidden">
        <p className="text-success-teal strong mt-2" style={{fontSize:"14px"}}>Monthly Reports</p>
        <h5 className="font-17 strong mt-4 mb-4">Upload your report in Xslx format.</h5>
        <Link to='/monthlyreport/submit'>
          <span className="btn btn-sm bg-gradient-primary text-white mt-2 mb-2">Submit</span><br />
        </Link>
      </div>
    </div>
  )
}

export default AnnualConference