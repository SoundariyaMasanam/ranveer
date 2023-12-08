import React, { useState, useEffect } from 'react'
import "assets/css/CompanyProfile/CompanyProfile.css"
import { GoClock } from "react-icons/go";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { TbAlertCircle } from "react-icons/tb"
import talalogo from "assets/img/t.png"

const CompanySpotlight = ({ data }) => {
  // console.log("data",data);
  const [spotlights, setspotlights] = useState([])
  const [indexValue, setIndexValue] = useState("")
  const [showAll, setShowAll] = useState(false)

  const spotlightData = data
  let curDate = moment(new Date());

  useEffect(() => {
    handleEvents();
    handleIndex()
  }, []);
  const handleEvents = () => {
    let eventArr = []
    spotlightData.map((item, index) => {
      const dateB = moment(item.date_add);
      const indexId = index + 1
      setIndexValue(indexId);
      let obj = {
        title: item.title,
        index: index + 1,
        message: item.message,
        date: curDate.diff(dateB, 'days'),
        publish_date: item?.publish_date,
      }
      eventArr.push(obj)
    })
    setspotlights([...eventArr])
  }
  const handleIndex = () => {
    if (indexValue < 6) {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }
  return (
    <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing px-2 dashboardSpotlight">
      <div className="">
        <div className="widget-heading">
          <div>
            <h5 className="">Tala Spotlight</h5>
          </div>
        </div>
        <div className="widget-content mt-4 mb-4">
          {spotlights.length > 0 ?
            <>
              {spotlights.slice(0, 5).map((item, index) => {
                console.log("item====>",item)
                return (
                  <div key={`sp${index}`} className="mb-2 d-flex flex-row border-bottoms border-lights pb-3 gap-md-0 gap-2">
                    <div className="col-1 t-icon">
                      <div className="image-container">
                        <img className="rounded1-circle avatar-xs" src={talalogo} alt="profile" />
                      </div>
                    </div>
                    <div className="col-md-8 col-7" style={{alignSelf: 'center'}}>
                      <h4 className="spotlighttitle">{item.title}</h4>
                    </div>
                    <div className="col-md-3 col-4" style={{alignSelf: 'center'}}>
                      <span className="float-right text-success-teal font-12">
                        <i className="las la-clock" >
                          <GoClock />
                        </i>
                        {/* <span className="px-2" >{item.date} days ago </span> */}
                        <span className="px-2" >{item.publish_date} </span>
                      </span>
                    </div>
                    <p className="font-12 mb-0 text-muted">
                      {item.message}
                    </p>
                  </div>
                )
              })}
              {showAll === true &&
                <Link to="/talaspotlight/viewmore">
                  <div className='col-12 d-flex justify-content-center mt-1'>
                    <span className="col-3 btn btn-block readmorebtn text-white" style={{fontSize:"13px"}}>View All</span>
                  </div>
                </Link>
              }
            </>
            :
            <div className='d-flex flex-column' style={{padding:"5px"}}>
              <div className='d-flex justify-content-center'>
                <TbAlertCircle
                  style={{ color: "grey", fontSize: "26px" }}
                />
              </div>
              <div className='d-flex justify-content-center mt-2' style={{ color: "grey", fontSize: "14px" }}>
                No Spotlights Found.
              </div>
            </div>
          }
        </div>
      </div>
      <div id='ctaForQuote' />
    </div>
  )
}

export default CompanySpotlight