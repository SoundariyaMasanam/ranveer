import React, { useRef, useEffect, useState } from 'react'
import AnnualConferenceCard from "./AnnualConferenceCard/AnnualConferenceCard"
import KeyPoints from "./KeyPoints/KeyPoints.js"
import OurPartners from './OurPartners/OurPartners.js'
import JoinUs from "./JoinUs/JoinUs"
import ListAttendence from './ListAttendence/ListAttendence'
import {
  getSponsersList,
  getAttendeeList,
  getKeyEventsList
} from "redux/Actions/AnnualConference"
import { useDispatch, useSelector } from 'react-redux';


const AnnualConference = () => {
  const dispatch = useDispatch();
  const [sponser, setSpomser] = useState('');
  useEffect(() => {
    dispatch(getAttendeeList());
    dispatch(getSponsersList());
    dispatch(getKeyEventsList());
    window.scrollTo(0, 0);
  }, [])
  const {    
    sponsersList,
    attendeeList,
    keyEventsList } = useSelector(state => state.annualconference);
    const scrollRef = useRef(null);

  return (
    <div className="layout-px-spacing" >
      <div className="row layout-spacing pt-4">
        <div className='col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-4'>
          <div className='widget-content widget-content-area' style={{marginBottom:"25px",padding:"10px 20px"}}>
            <AnnualConferenceCard />
          </div>
          <div className='widget-content widget-content-area' style={{marginBottom:"25px"}}>
            <KeyPoints keyEventsList={keyEventsList} />
          </div>                
          <div className='widget-content widget-content-area' style={{marginBottom:"25px"}}>
            <OurPartners
              scrollRef={scrollRef}
              sponsersList={sponsersList}
              setSpomser={setSpomser}
            />
          </div>         
          <div className='widget-content widget-content-area' style={{marginBottom:"25px"}}>
            <ListAttendence attendeeList={attendeeList} />
          </div>         
          <div className='widget-content widget-content-area' style={{marginBottom:"25px"}}>
            <JoinUs
              ref={scrollRef}
              sponsersList={sponsersList}
              sponser={sponser}
            />
          </div>         
        </div>
      </div>
    </div>
  )
}

export default AnnualConference