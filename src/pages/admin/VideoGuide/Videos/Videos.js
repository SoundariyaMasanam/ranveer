import React from 'react'
import "../../../../assets/css/VideoGuide/Videos.css"
import video from "../../../../assets/img/video.mp4"
import { AiOutlineFilePdf } from "react-icons/ai"
import BoldHeading from '../../../../components/BoldHeading/BoldHeading'
import pdf from "../../../../assets/img/pdf.png"

const Videos = () => {
    return (
        // <div className="col-xl-9 col-lg-8 col-md-8">
        <div className="col-xl-12 col-lg-12 col-md-12">
            <div className='profile-info'>
                <iframe src={video} className='video'></iframe>
            </div>
            <br />          
            <div className="profile-info">
                <div className="widget-header">
                    <BoldHeading                       
                        Boldheading="Helpful Guide Manuals"
                    />
                </div>
                <br />
                <ul className="list-group">
                    <li className="list-group-item" style={{ color: "#000" }}>
                        <i className="fa fa-file-pdf-o" aria-hidden="true">
                            <img src={pdf} style={{width:"30px"}}/>
                        </i> &nbsp;&nbsp;Tala Website User Manuals
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Videos