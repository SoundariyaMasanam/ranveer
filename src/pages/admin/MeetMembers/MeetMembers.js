import React, { useState, useEffect } from 'react'
import "assets/css/Dashboard/ContentLayout.css"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaCalendarAlt } from "react-icons/fa"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { TfiMenuAlt } from "react-icons/tfi"
import { GiCancel } from "react-icons/gi"
import { BsGlobe2 } from "react-icons/bs"
import { CiCircleCheck } from "react-icons/ci";
import {
  AiOutlineClockCircle,
  AiOutlineUser
} from "react-icons/ai"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { useForm } from "react-hook-form";
import {
  scheduleEvent,
  getScheduleEvent,
  updateScheduleEvent,
  cancelMetting,
  getTimeZone
} from "redux/Actions/MeetMember";
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from "redux/Reducers/MeetMemberSlice";
import { setLogout } from "redux/Reducers/LoggedSlice";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import SearchBox from 'components/Search/SearchBox';
import MeetMemberSearchResult from './MeetMemberSearchResult/MeetMemberSearchResult';
import { toast } from 'react-toastify';
import Select from 'react-select';
import optionsData from "./optionData";
import { TbAlertCircle } from "react-icons/tb"
import styles from "components/ScrollStyle"

const MeetMembers = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setDescription] = useState('');
  const [isBlank, setIsBlank] = useState(false);
  const [clickValue, setClickValue] = useState(false);
  const [mId, memberId] = useState(0);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [updateEventChange, setupdateEventChange] = useState(false);
  const [mValue, memberValue] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(true);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const {
    tokenExp,
    isLoading,
    eventList,
    isSuccess,
    timeZoneList } = useSelector(state => state.meetmember);
  const { memberProfileData } = useSelector(state => state.member);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  useEffect(() => {
    if (tokenExp && Object.keys(tokenExp).length > 0
      && tokenExp.error === 'Invalid token') {
      dispatch(setLogout());
      navigate("/");
    }
  }, [tokenExp])

  useEffect(() => {
    dispatch(getTimeZone());
    dispatch(getScheduleEvent());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${isSuccess.msg}`, {
        toastId: 'success1',
        autoClose: 1500
      })
      setTimeout(() => {
        reset();
        dispatch(setInitialState());
        dispatch(getScheduleEvent());
        memberValue('');
        memberId(0);
        setClickValue(false);
        setUpdateEvent(false);
        setupdateEventChange(false);
        setDescription(false);
      }, 100);
    }
  }, [isSuccess]);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    let event = [];
    if (Object.keys(eventList).length > 0
      && eventList.data.length > 0
    ) {
      eventList.data.map(item => {
        event.push({
          id: item.id,
          title: item.title,
          is_updated: item.is_updated,
          logged_in_member_id: memberProfileData?.data?.logged_in_member_id,
          member_id: item?.member_id,
          schedule_with_member: item?.schedule_with_member,
          member_name: item?.member_name,
          schedule_with_member_name: item?.schedule_with_member_name,
          timecal: `${moment(item.from_date).format('HH:mm')} - ${moment(item.to_date).format('HH:mm')}`,
          date: moment(item.from_date).format('YYYY-MM-DD'),
          fromtime: moment(item.from_date).format('HH:mm'),
          totime: moment(item.to_date).format('HH:mm'),
          start: moment(item.from_date).format('YYYY-MM-DDTHH:mm:ss'),
          end: moment(item.to_date).format('YYYY-MM-DDTHH:mm:ss'),
          timezone: item?.timezone,
          status: item?.status,
          extendedProps: {
            department: `${item.title}${item.id}`
          },
          description: item.description
        })
      })
    }
    setEvents(event)
  }, [eventList]);

  const [startList, setStartList] = useState([]);
  const [endList, setEndList] = useState([{
    value: '00:00',
    label: '00:00'
  }]);

  useEffect(() => {
    let optionsArr = []
    optionsData.map((item) => {
      let obj = {
        value: item.value,
        label: item.label
      };
      optionsArr.push(obj);
      setStartList(optionsArr);
    });
  }, []);

  const [countryTimezone, setCountryTimezone] = useState([]);
  useEffect(() => {
    let CT = [];
    if (Object.keys(timeZoneList).length > 0
      && Object.keys(timeZoneList.data).length > 0) {
      const TL = timeZoneList.data;
      for (const key in TL) {
        if (Object.hasOwnProperty.call(TL, key)) {
          CT.push({
            value: key,
            label: TL[key]
          });
        }
      }
    }
    setCountryTimezone(CT);
  }, [timeZoneList])

  const [STV, setSTV] = useState('');
  const [ETV, setETV] = useState('');
  const [ETE, setETE] = useState(false);
  const [TZE, setTZE] = useState(false);
  const [TZV, setTZV] = useState(false);

  const handleOnChange = (name, value) => {

    if (name === 'start-time') {
      setSTV(value.value);
      changeEndTime(value.value, '00:00')
    }
    if (name === 'end-time') {
      setETV(value.value);
      setETE(false);
    }
    if (name === 'timezone') {
      setTZV(value.value);
      setTZE(false);
    }
  }

  const changeEndTime = (endVal, setVal) => {
    let optionsArr = [];
    let mod = 1;
    optionsData.map((item) => {
      if (item.value === endVal && mod === 1) {
        mod = 2;
      }

      if (mod === 2 && item.value !== endVal) {
        let obj = {
          value: item.value,
          label: item.label,
          // isDisabled: (mod === 1 || item.value === endVal) ? true : false
        };
        optionsArr.push(obj)
      }
      setEndList(optionsArr);
      setETV(setVal);
    });
  }
  const eventClickUpdate = (info) => {
    let identy = info.event.extendedProps.department;
    let event = events.find((ev) => ev.extendedProps.department === identy);
    setValue('title', event.title);
    setTZV(event.timezone);
    setSTV(event.fromtime)
    changeEndTime(event.fromtime, event.totime)
    // setETV(event.totime)
    setValue('date', event.date);
    memberValue(event.schedule_with_member_name)
    memberId(event.schedule_with_member)
    setUpdateEvent(event);
    setClickValue(event.date);
    setDescription(event.description);
  }
  const handleOnClose = () => {
    setClickValue(false);
    setUpdateEvent(false);
    setupdateEventChange(false);
    setDescription(false);
    memberValue('');
    memberId(0);
    reset();
  }


  const onSubmit = (data) => {
    data.schedule_with_member = mId;
    data.from_time = STV ? STV : '';
    data.to_time = ETV ? ETV : '';
    setETE(ETV && ETV !== '00:00' ? false : true);
    data.timezone = TZV ? TZV : '';
    setTZE(TZV || TZV !== '' ? false : true);

    if (!value || value === '') {
      data.description = value;
      setIsBlank(true);
      return false;
    }
    else {
      data.description = value;
      setIsBlank(false);
    }

    if (ETV && ETV !== '00:00' && (TZV || TZV !== '')) {
      if (!updateEvent) {
        delete data.eventid;
        dispatch(scheduleEvent(data))
      } else {
        data.eventid = updateEvent?.id
        dispatch(updateScheduleEvent(data))
      }
    }
  }


  const selectHandle = (id, name) => {
    memberValue(name);
    memberId(id);
    setSTV('');
    setETV('');
    setTZV(countryTimezone[0].value)
    setClickValue(true);
    setEndList([{
      value: '00:00',
      label: '00:00'
    }])
  }
  const cancelHandle = () => {
    // console.log('id', id);
    setShow(false)
    dispatch(cancelMetting({ meeting_id: updateEvent?.id, status: "cancelled" }))
  }

  const handleClose = () => setShow(false);
  const handleUpdateEvent = () => setupdateEventChange(true);
  const handleShow = () => {
    setShow1(false)
    setShow(true);
  }

  // console.log('STV', STV);
  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-xl-12 col-lg-4 col-md-12 col-sm-12 col-12">
          <div className="">
            <SearchBox heading="Meet Licensee Search" type="meetmember" />
            <br />
            <MeetMemberSearchResult selectHandle={selectHandle} />
            <br />
          </div>
        </div>
        <div className=''>
          <div className="widget-content widget-content-area">
            <div className="widget-header">
              <div className="row">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView='dayGridMonth'
                  weekends={true}
                  displayEventEnd={true}
                  eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false //"short"
                  }}
                  headerToolbar={{
                    left: 'title',
                    center: '',
                    right: 'prev,next'
                  }}
                  events={events}
                  eventContent={renderEventContent}
                  // dateClick={(arg) => setClickValue(arg.dateStr)}
                  validRange={{ start: new Date() }}
                  eventClick={(info) => {
                    if (info.event.extendedProps.status === 'pending') {
                      eventClickUpdate(info);
                    }
                  }}
                  className="Calender"
                />
              </div>
            </div>
          </div>
        </div>
        {clickValue &&
          /* Pop up code */
          <Modal show={show1} onHide={() => handleOnClose()} dialogClassName="modal-90w">
            <Modal.Header closeButton>
              <div className='col-12 calenderIcon'>
                <FaCalendarAlt className='col-12 calenderIconMain d-flex justify-content-center align-items-center mt-1' />
              </div>
              <Modal.Title className='px-2'>New Meeting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isLoading &&
                <div className="spin-loader">
                  <RotatingLines
                    strokeColor="#bbce00"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="70"
                    visible={true}
                  />
                </div>
              }
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("eventid", {
                  required: false,
                })} value={updateEvent?.id} />

                {updateEvent
                  && memberProfileData?.data?.logged_in_member_id === updateEvent?.schedule_with_member
                  && <div className="d-flex flex-row" style={{ fontWeight: "600" }}>
                    Propose a New time, If you want to reschedule the meeting. Please change the time and update the meeting.
                  </div>
                }
                <Form.Group className="mb-4 mt-3" controlId="exampleForm.ControlInput1">
                  <div className="d-flex flex-row">
                    <AiOutlineUser style={{ fontSize: "17px" }} />
                    <Form.Label className='px-1'>Licensee</Form.Label>
                  </div>
                  <Form.Control
                    type="text"
                    placeholder="Licensee"
                    autoFocus
                    className='p-3'
                    {...register("member_name", {
                      required: false,
                    })}
                    readOnly
                    value={mValue}
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                  <div className="d-flex flex-row">
                    <MdOutlineModeEditOutline style={{ fontSize: "17px" }} />
                    <Form.Label className='px-1'>Meeting Subject
                      <span style={{ color: "red" }}> *</span>
                    </Form.Label>
                  </div>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    autoFocus
                    className='p-3'
                    {...register("title", {
                      required: "Meeting subject should not be empty",
                    })}
                    onChange={() => handleUpdateEvent()}
                  />
                  {errors.title && <span className="error d-block">{errors.title.message}</span>}
                </Form.Group>
                <Form.Group
                  className="mb-4"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Row>
                    <Col xs={6} md={1} className='d-flex flex-row mt-2'>
                      <AiOutlineClockCircle style={{ fontSize: "16px", marginTop: "3PX" }} />
                      <Form.Label className='px-1'>Date
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={4}>
                      <Form.Control type='date' min={moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD')}
                        {...register("date", {
                          required: "Date should not be empty",
                        })}
                        onChange={() => handleUpdateEvent()}
                      />
                      {errors.date && <span className="error d-block" >{errors.date.message}</span>}
                    </Col>

                    <Col xs={6} md={3}>
                      <Select
                        styles={styles}
                        options={startList}
                        value={
                          startList.filter(option =>
                            option.label === STV)}
                        isSearchable={true}
                        placeholder="Start Time"
                        onChange={(value) => {
                          handleOnChange('start-time', value);
                          handleUpdateEvent();
                        }}
                      />
                    </Col>
                    <>
                      <Col xs={6} md={1}>
                        <div><HiOutlineArrowNarrowRight style={{ fontSize: "16px", marginTop: "10PX" }} /></div>
                      </Col>
                      <Col xs={6} md={3}>
                        <Select
                          styles={styles}
                          options={endList}
                          value={
                            endList.filter(option =>
                              option.label === ETV)}
                          isSearchable={true}
                          placeholder="End Time"
                          onChange={(value) => {
                            handleOnChange('end-time', value);
                            handleUpdateEvent();
                          }}
                        />
                        {ETE &&
                          <span className="error d-block">
                            End time should not be empty
                          </span>
                        }
                      </Col>
                    </>

                  </Row>
                </Form.Group>
                <div className='mb-3'>
                  <div className="d-flex flex-row">
                    <BsGlobe2 style={{ fontSize: "16px", marginTop: "5PX" }} />
                    <Form.Label className='px-2'>Timezone  <span style={{ color: "red" }}> *</span></Form.Label>
                  </div>
                  <Select
                    styles={styles}
                    options={countryTimezone}
                    value={
                      countryTimezone.filter(option =>
                        option.value === TZV)}
                    isSearchable={true}
                    onChange={(value) => {
                      handleOnChange('timezone', value);
                      handleUpdateEvent();
                    }}
                  />
                  {TZE &&
                    <span className="error d-block">
                      Timezone should not be empty
                    </span>
                  }
                </div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <div className="d-flex flex-row">
                    <TfiMenuAlt style={{ fontSize: "16px", marginTop: "5PX" }} />
                    <Form.Label className='px-2'>Description  <span style={{ color: "red" }}> *</span></Form.Label>
                  </div>
                  <ReactQuill theme="snow" value={value}
                    onChange={(value) => {
                      setDescription(value);
                      handleUpdateEvent();
                    }}
                    placeholder="Type details for this new meeting" />
                  {isBlank && <span className="error d-block">Description should not be empty</span>}
                </Form.Group>
                <Modal.Footer >
                  <Button variant="secondary" onClick={() => handleOnClose()} style={{ fontSize: "12px" }}>
                    Close
                  </Button>
                  {updateEvent
                    && <Modal.Title className='px-2'
                      onClick={handleShow}
                    >
                      <Button className='cancel' style={{ fontSize: "12px" }}> <GiCancel />
                        Cancel Meeting</Button>
                    </Modal.Title>
                  }
                  {updateEvent
                    && memberProfileData?.data?.logged_in_member_id === updateEvent?.schedule_with_member
                    && <Modal.Title className='px-2'
                      onClick={() => dispatch(cancelMetting({
                        meeting_id: updateEvent?.id,
                        status: "confirmed"
                      }))}>
                      <Button className='success' style={{ fontSize: "12px" }}> <CiCircleCheck />&nbsp;
                        Accept Meeting</Button>
                    </Modal.Title>
                  }

                  {updateEvent && memberProfileData?.data?.logged_in_member_id === updateEvent?.member_id
                    && updateEvent?.is_updated === 1
                    && <Modal.Title className='px-2'
                      onClick={() => dispatch(cancelMetting({
                        meeting_id: updateEvent?.id,
                        status: "confirmed"
                      }))}>
                      <Button className={`success ${updateEventChange ? 'disabled' : ''}`} style={{ fontSize: "12px" }}> <CiCircleCheck />&nbsp;
                        Accept Meeting</Button>
                    </Modal.Title>}

                  <Button type="submit" className={` ${!updateEventChange ? 'btn btn-secondary disabled' : 'submitMeeting'}`}
                    style={{ fontSize: "12px" }}>
                    {updateEvent
                      ? "Update Meeting" : "Request Meeting"}
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        }
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#1B4D70" }}><TbAlertCircle /> Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you Want to Cancel?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={() => cancelHandle()}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div >
  )
}

export default MeetMembers

function renderEventContent(eventInfo) {
  // console.log('eventInfo',eventInfo.event.extendedProps)
  return (
    <div style={{ color: '#1b4d70', fontWeight: "800" }}>
      {/* <b>{eventInfo.timeText}</b> <br /> */}
      <b className="meetTime" >{eventInfo.event.extendedProps.timecal}</b>
      <div className="meetTitle"><p className='parameet'>{eventInfo.event.title}</p></div>
      {/* <i>{eventInfo.event.extendedProps.member_name}</i><br/> */}
      <div className="meetTitle" ><p className='parameet'>{eventInfo.event.extendedProps.schedule_with_member_name}</p></div>

      {eventInfo.event.extendedProps.logged_in_member_id === eventInfo.event.extendedProps.member_id
        && eventInfo.event.extendedProps.is_updated === 1
        && <div className="meetTitle1"><p className='parameet'>Requested Licensee has <br />changed the time<br /></p></div>}

      {
        (() => {
          let color = '';
          if (eventInfo.event.extendedProps.status === 'confirmed') {
            color = '#38a33b';
          } else if (eventInfo.event.extendedProps.status === 'pending') {
            color = '#c57f00';
          } else {
            color = '#f00';
          }
          return (
            <>
              <div className='card mt-2 d-md-flex d-none' style={{ backgroundColor: `${color}`, padding: "2px", textAlign: "center" }}>
                <div style={{ textTransform: "capitalize", color: "white", fontWeight: "600" }}>
                  {eventInfo.event.extendedProps.status}
                </div>
              </div>
              <hr className='d-md-flex d-none' style={{ width: "125px" }} />

              <div className='mt-2 d-md-none d-flex' style={{ color: `${color}`, fontWeight: "600", fontSize: "6px" }}>
                {/* <div style={{ textTransform: "capitalize", color: "white", fontWeight: "600" }}> */}
                {eventInfo.event.extendedProps.status}
              </div>
              {/* </div> */}
            </>
          )
        })()
      }
    </div>
  )
}