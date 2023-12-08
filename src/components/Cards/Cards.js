import React from 'react'
import "assets/css/Announcements/Announcements.css"

const Cards = ({ heading, Para }) => {
    return (
        <div className="profile-info">
            <div className="row">
                <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                    <h4 className='annualTitles'> {heading}</h4>
                    <br />
                </div>
            </div>
            <div style={{ textAlign: "justify" }} className='announcePara'>
                {Para}
            </div>           
        </div>
    )
}

export default Cards