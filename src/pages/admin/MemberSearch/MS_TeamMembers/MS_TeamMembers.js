import React, { useState } from 'react'
import "assets/css/VideoGuide/Videos.css"
import { FaPhoneAlt } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import profile6 from "assets/img/profile-5.jpg"

const MS_TeamMembers = () => {

    const teams = [
        {
            name: "Kevin",
            post: "Director",
            mail: "Kevin@gmail.com",
            phone: "9898989898",
            index: 1,
        },
        {
            name: "Rose",
            post: "Director",
            mail: "Rose@gmail.com",
            phone: "9898989898",
            index: 2,
        },
        {
            name: "Jack",
            post: "Director",
            mail: "Jack@gmail.com",
            phone: "9898989898",
            index: 3,
        },
        {
            name: "Lavanya",
            post: "Director",
            mail: "Lavanya@gmail.com",
            phone: "9898989898",
            index: 4,
        },
        {
            name: "Jaya",
            post: "Director",
            mail: "Jaya@gmail.com",
            phone: "9898989898",
            index: 5,
        }
    ]
    const [teamMembers, setTeamMembers] = useState(teams);
    return (
        <div className="teamscrollbars col-xl-3 col-lg-8 col-md-8 mt-md-0">
            {teamMembers.map((data) => {
                return (
                    <div className="profile-left mb-5 ">
                        <center>
                            <h4>Team Licensee</h4>
                        </center>
                        <center>
                            <img src={profile6} alt="image" className="img-fluid rounded-circle img-thumbnail teamprofile" />
                        </center>
                        <center>
                            <p className="mb-0 personName">{data.name}<br />{data.post}</p>                           
                            <center>
                                <div className="info-area">
                                    <h6>
                                        <i className="fa fa-envelope-o" aria-hidden="true">
                                            <GrMail />
                                        </i>
                                        &nbsp;&nbsp;{data.mail}
                                    </h6>
                                    <h6>
                                        <i className="fa fa-phone" aria-hidden="true">
                                            <FaPhoneAlt />
                                        </i>
                                        &nbsp;&nbsp;{data.phone}
                                    </h6>
                                </div>
                                <br />
                            </center>
                        </center>
                    </div>
                )
            })}               
        </div>
    )
}

export default MS_TeamMembers