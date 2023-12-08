import React, { useState } from 'react'
import profile1 from "assets/img/profile-1.jpg"
import profile2 from "assets/img/profile-2.jpg"
import profile3 from "assets/img/profile-3.jpg"
import profile4 from "assets/img/profile-4.jpg"
import "assets/css/AnnualConference/AnnualConference.css"

const Speakers = () => {
  const speakerData = [
    {
      id: 1,
      img: profile1,
      name: "Kesava John",
      country: "California, USA"
    },
    {
      id: 2,
      img: profile2,
      name: "John Doe",
      country: "California, USA"
    },
    {
      id: 3,
      img: profile3,
      name: "Alexa Roof",
      country: "California, USA"
    },
    {
      id: 4,
      img: profile4,
      name: "Yousuf Martin",
      country: "California, USA"
    },
  ]
  const [speakers, setSpeakers] = useState(speakerData)
  return (
    <div className="widget-header">
      <div className="row">
        <div className="col-xl-12 col-md-12 col-sm-12 col-12">
          <h4 className='annualTitles'>Speakers</h4>
          <br />
        </div>
        <div className="col-xl-12">
          <div className="row">
            {speakers.map((data) => {
              return (
                <div key={`speaker${data.id}`} className="col-xl-3">
                  <div className=" items">
                    <div className="item-content">
                      <div className="user-profile">
                        <center>
                          <img src={data.img} alt="avatar" />
                        </center>
                        <div className="user-meta-info">
                          <br />
                          <center><p className="user-name">{data.name}</p></center>
                          <center><p className="user-name">{data.country}</p></center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Speakers