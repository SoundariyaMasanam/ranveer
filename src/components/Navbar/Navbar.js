import React from 'react'
import "assets/css/Dashboard/Dashboard.css"
import logo from "assets/img/translogo.png"
import { FaRegBell } from "react-icons/fa"
const Navbar = () => {
    return (
        <div className="fixed-profile">
            <div className="" >
                <img src={logo} style={{ width: "210px"}} />
            </div>
            {/* <ul className="flex-row profile-option-container">
                <li className="option-item dropdown notification-dropdown">
                    <div className="option-link-container">
                        <div className="option-link">
                            <i className="las la-bell">
                                <FaRegBell />
                            </i>
                            <div className="blink">
                                <div className="circle"></div>
                            </div>
                        </div>
                        <div className="text-left">
                            <h6>Notifications</h6>
                            <p>4 Unread</p>
                        </div>
                    </div>
                </li>
            </ul> */}
        </div>
    )
}

export default Navbar