import React, { useState } from 'react';
import "assets/css/CompanyProfile/CompanyProfile.css";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { setInitialState } from "redux/Reducers/EventExhibitionSlice";
import { TbAlertCircle } from "react-icons/tb"

const EventParticipate = ({ data }) => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
      <div className="">
        <div className="widget-heading">
          <h5 className="">Events & Exhibitions</h5>
        </div>
        <div className="widget-content mt-4 mb-4">
          {data.length > 0 ?
            <>
              {data.slice(0, 3).map((item, index) => {
                return (
                  <div key={`s${index}`} className="weekly-bestsellers"
                    onClick={() => dispatch(setInitialState(false))}>
                    <Link to={`/exhibitions/details/${item.id}`} >
                      <div className="t-item">
                        <div className="t-company-name">
                          <div className="t-icon">
                            <div className="image-container">
                              <img className="rounded1-circle avatar-xs" src={item?.thumbnail_url} alt="profile" />
                            </div>
                          </div>
                          <div className="t-name">
                            <h4 className="meta-date">{item?.name}</h4>
                          </div>
                        </div>
                        <div className="t-rate rate-inc">
                          <p><span>{item?.year}</span></p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
              {data.length > 3 &&
                <div className='col-12 d-flex justify-content-center mt-1' >
                  <span className="col-6 btn btn-block btn-primary"
                    onClick={() => setShow(true)}>View All</span>
                </div>
              }
            </>
            :
            <div className='d-flex flex-column'>
              <div className='d-flex justify-content-center'>
              <TbAlertCircle
                style={{ color: "grey", fontSize: "26px" }}
              />
               </div>
              <div className='d-flex justify-content-center mt-2' style={{ color: "grey",fontSize: "14px" }}>
                They are not attending any events.
              </div>
            </div>
            // <p>They are not attending any events.</p>
          }
        </div>
        <Modal show={show} onHide={() => setShow(false)} dialogClassName="">
          <Modal.Header closeButton>
            <Modal.Title>Events & Exhibitions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="widget-content mt-4 mb-4">
              {data.map((item, index) => {
                return (
                  <div key={`s${index}`} className="weekly-bestsellers"
                    onClick={() => dispatch(setInitialState(false))}>
                    <Link to={`/exhibitions/details/${item.id}`} >
                      <div className="col-12 card-boxes d-flex flex-row t-item mt-3">
                        <div className="col-8 t-company-name d-flex flex-row gap-3 mt-1">
                          <div className="t-icon">
                            <div className="image-container">
                              <img className="rounded-circle avatar-xs" src={item?.thumbnail_url} alt="profile" />
                            </div>
                          </div>
                          <div className="t-name mt-1">
                            <h5 className="meta-date">{item?.name}</h5>
                          </div>
                        </div>
                        <div className="col-4 d-flex justify-content-end t-rate rate-inc mt-2">
                          <p><span>{item?.year}</span></p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div >
  )
}

export default EventParticipate