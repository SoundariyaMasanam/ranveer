import React from 'react'
import coming from "../../../assets/img/coming.png"

const VideoGuide = () => {
  return (   
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
          <div className="widget-content widget-content-area br-6 ">
            <h4 className="table-header" style={{ fontSize: "20px" }}>Video Guide</h4>
            <br /><br />
            <div className='d-flex justify-content-center'>
              <img src={coming} alt='coming' className='img-fluid ' style={{ width: "60%", height: "60%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGuide