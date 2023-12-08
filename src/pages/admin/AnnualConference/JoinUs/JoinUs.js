import React, { useEffect, useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai"
import "assets/css/AnnualConference/AnnualConference.css"
import Sponser from "./Sponser"
import Attend from "./Attend"
import { forwardRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TbAlertCircle } from "react-icons/tb"
import { ToastContainer, toast } from 'react-toastify';
import {  
  getConferenceBanner,
  getAttendeeList,
  cancelAttended,
  cancelSponsored
} from "redux/Actions/AnnualConference"
import { setInitialState } from "redux/Reducers/AnnualConferenceSlice"
import { useDispatch, useSelector } from 'react-redux';

const JoinUs = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [basicActive, setBasicActive] = useState('tab1');
  const { conferenceBanner, isSuccess } = useSelector(state => state.annualconference);
  useEffect(() => {
    if (props?.sponser) {
      setBasicActive('tab2')
    }
  }, [props.sponser])

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        if (Object.keys(isSuccess).length > 0
          && typeof isSuccess.msg !== 'undefined') {
          toast.success(`${isSuccess.msg}`, {
            toastId: 'cancle',
            autoClose: 1000
          })
        }
        setShow(false);
        setShow1(false);
        dispatch(getConferenceBanner());
        dispatch(getAttendeeList());
        dispatch(setInitialState(false));
      }, 1000);
    }
  }, [isSuccess])

  const cancelHandle = (value) => {
    if(value === 'attend'){
      dispatch(cancelAttended(conferenceBanner?.data?.id))
    }else{
      dispatch(cancelSponsored(conferenceBanner?.data?.id))
    }    
    
  }

  return (
    <>
      <div className="widget-header" >
        <div className="row">
          <div className="col-xl-12 col-md-12 col-sm-12 col-12">
            <h4 className='annualTitles'>Join the Event</h4>
            <br />
          </div>
        </div>
      </div>
      <div className='rounded-corner-pills-icon' ref={ref}>
        <MDBTabs pills className='mb-3 d-flex justify-content-center'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => setBasicActive('tab1')} active={basicActive === 'tab1'}>
              <AiOutlineHome className='pillsIcon' />
              Interested to Attend
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem className='px-3'>
            <MDBTabsLink onClick={() => setBasicActive('tab2')} active={basicActive === 'tab2'}>
              <AiOutlineUser className='pillsIcon' />
              Interested to Sponsor
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent style={{backgroundColor:"#d7d7d7"}}>
          <MDBTabsPane show={basicActive === 'tab1'}>
            {conferenceBanner?.data?.already_interest_to_attended === 1 ?
              <div className='col-12 d-flex justify-content-center'>
                <div className="col-6 card-box mt-5">
                  <div style={{ color: "#0570BE", fontSize: "20px", textAlign: "center" }}><TbAlertCircle /></div>
                  <div className='al-sub text-center'>You are already submitted</div>

                  <div className='al-sub text-center'>
                    <span style={{ color: "blue" }} className="btn btn-sm bg-gradient-primary text-white mt-2"
                      onClick={() => setShow(true)}>
                      Cancel
                    </span>
                  </div>
                  <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title style={{ color: "#1B4D70" }}><TbAlertCircle /> Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you Want to Cancel?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShow(false)}>
                        No
                      </Button>
                      <Button variant="primary" onClick={() => cancelHandle('attend')}>
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              :
              <Attend />
            }

          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'tab2'} >
            {conferenceBanner?.data?.already_sponser_to_attended === 1 ?
              <div className='col-12 d-flex justify-content-center'>
                <div className="col-6 card-box mt-5">
                  <div style={{ color: "#0570BE", fontSize: "20px", textAlign: "center" }}><TbAlertCircle /></div>
                  <div className='al-sub text-center'>You are already submitted</div>
                  <div className='al-sub text-center'>
                    <span style={{ color: "blue" }} className="btn btn-sm bg-gradient-primary text-white mt-2"
                      onClick={() => setShow1(true)}>
                      Cancel
                    </span>
                  </div>
                  <Modal show={show1} onHide={() => setShow1(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title style={{ color: "#1B4D70" }}><TbAlertCircle /> Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you Want to Cancel?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShow1(false)}>
                        No
                      </Button>
                      <Button variant="primary" onClick={() => cancelHandle('sponsor')}>
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
              :
              <Sponser list={props} />
            }
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
      <ToastContainer />
    </>
  )
});

export default JoinUs